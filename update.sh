info1=$1

if ["$info1" = ""]:
then info1=":pencil: update content"
fi

git add -A
git commit -m "$info1"
git push origin hexo
