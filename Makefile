#Makefile

install: 
	@npm ci

publish:
	@npm publish --dry-run

link:
	@npm link

lint:
	@npx eslint .

lintFix:
	@npx eslint . --fix

rec:
	@clear
	@asciinema rec demo.cast
