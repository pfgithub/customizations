function ifconfig
	node -e "var os=require(\"os\"),ifaces=os.networkInterfaces();Object.keys(ifaces).forEach((e)=>{var o=0;ifaces[e].forEach((s)=>{!1===s.internal&&(console.log(`\${s.family} - \${s.address} - \${o>=1?e+\":\"+o:e}`),++o)})});"
end