
build:
	rm -rf boilerplates/app/dist
	rm -rf boilerplates/app/src/pages/.umi
	rm -rf boilerplates/demo/dist
	rm -rf libs
	npm run build

publish: build
	npm publish

sync:
	cnpm sync dva-cli
	tnpm sync dva-cli
