Compile pug to HTMl:
- `npm install pug-cli -g`
- `pug pug -o . && rm -R mixins` (need to remove the mixins folders as it is not possible to exclude folders with pug cli)