
build:
	rm -rf libs
	npm run build

publish: build
	rm -rf boilerplates/app/dist
	rm -rf boilerplates/demo/dist
	npm publish

sync:
	cnpm sync dva-cli
	tnpm sync dva-cli
