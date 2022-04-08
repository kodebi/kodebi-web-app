module.exports = {
	setupFilesAfterEnv: ['./src/config/rtl.setup.js'],
	testMatch: ['**/?(*.)test.js?(x)'],
	testEnvironment: 'jsdom',
};
