#/bin/sh
SRC=/tmp/bgpg
DEST=/usr/local/bgpg
# Install node & npm
apk add --no-cache nodejs npm
# Unpack & move
cd ${SRC}
tar -xzf mimopo-bgpg-backend-*.tgz
mv package/* ${DEST}
tar -xzf mimopo-bgpg-frontend-*.tgz
mv package/dist/bgpg ${DEST}/frontend
# Clean
rm -Rf *
# Install dependencies
cd ${DEST}
npm i --production
# Remove npm cache
npm cache clean --force
# Remove npm itself
apk del npm