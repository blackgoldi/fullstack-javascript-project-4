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
	@rm demo.cast
	@clear
	@asciinema rec demo.cast

recPublish:
	@clear
	@asciinema upload demo.cast
	