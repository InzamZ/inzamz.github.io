info1=$1

if ["$info1" = ""]:
then info1=":pencil: update content"
fi

export https_proxy="http://localhost:7890"
export http_proxy="http://localhost:7890"

git add -A
git commit -m "$info1"
git push origin hexo
