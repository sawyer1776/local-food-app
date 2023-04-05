echo "switching to branch master"
git checkout master

echo "building app..."
npm run build

echo "deploying Files to server..."
scp -r build/* clay@137.184.98.71:/var/www/137.184.98.71/

echo "done"
