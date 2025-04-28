const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Установка пакетов
console.log('Installing packages...');
try {
  execSync('npm init @elbrus/config@latest -y', { stdio: 'inherit' });
  execSync(
    'npm i sequelize sequelize-cli pg pg-hstore express morgan dotenv nodemon bcrypt',
    { stdio: 'inherit' },
  );
  execSync('npm i jsonwebtoken cookie-parser', { stdio: 'inherit' });
  console.log('Packages installed successfully!');
} catch (error) {
  console.error('Error installing packages:', error.message);
}

// Обновление package.json с новыми скриптами
try {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  packageJson.scripts = {
    ...packageJson.scripts,
    'db:reset':
      'sequelize db:drop && sequelize db:create && sequelize db:migrate && sequelize db:seed:all',
    dev: 'nodemon src/server.js',
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('Updated package.json with new scripts');
} catch (error) {
  console.error('Error updating package.json:', error.message);
}

// Создание файла .sequelizerc
const sequelizercContent = `const path = require('path');
module.exports = {
  config: path.resolve('db', 'database.json'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations'),
};`;

const sequelizercPath = '.sequelizerc';
if (!fs.existsSync(sequelizercPath)) {
  fs.writeFileSync(sequelizercPath, sequelizercContent);
  console.log(`Created file: ${sequelizercPath}`);
}

// Основные директории
const baseDir = './src';
const dirs = ['controllers', 'routes', 'services', 'middlewares', 'config', 'utils'];

// Создание директорий и .gitignore файлов
dirs.forEach((dir) => {
  const dirPath = path.join(baseDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }

  // Создание .gitignore в каждой папке
  const gitignorePath = path.join(dirPath, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(gitignorePath, '');
    console.log(`Created .gitignore in: ${dirPath}`);
  }
});

// Пример файлов
const files = [
  {
    path: 'app.js',
    content:
      "const express = require('express');\nconst morgan = require('morgan');\nconst cookieParser = require('cookie-parser');\nconst app = express();\n\napp.use(express.json());\napp.use(morgan('dev'));\napp.use(cookieParser());\n\nmodule.exports = app;",
  },
  {
    path: 'server.js',
    content:
      "const app = require('./app');\nconst PORT = process.env.PORT || 3000;\n\napp.listen(PORT, () => {\n    console.log(`Server running on port ${PORT}`);\n});",
  },
  {
    path: 'routes/index.js',
    content:
      "const express = require('express');\nconst router = express.Router();\n\nrouter.get('/', (req, res) => {\n    res.json({ message: 'API is working!' });\n});\n\nmodule.exports = router;",
  },
];

// Создание файлов
files.forEach((file) => {
  const filePath = path.join(baseDir, file.path);
  const dirName = path.dirname(filePath);
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, file.content);
    console.log(`Created file: ${filePath}`);
  }
});

console.log('REST API structure created successfully!');
