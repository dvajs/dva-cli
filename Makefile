
build:
	rm -rf libs
	npm run build

publish: build
	npm publish

publish-sync: publish
	cnpm sync dva-cli
	tnpm sync dva-cli
