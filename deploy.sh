echo "switching to branch master"
git checkout master

echo "building app..."
npm run building

echo "deploying Files to server..."
scp -r build/* root@http://24.199.64.174:/var/www/http://24.199.64.174/

echo "done"

#  http://159.203.136.82:3000