module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@components': './src/components',
        '@utils': './src/utils',
      },
    }],
  ],
};
