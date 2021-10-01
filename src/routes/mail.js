const express = require('express');

app.post('/contact/forma' , (req , res)=>{

	let data=req.body
	let stmpTransport = nodemailer.createTransport({
	service:'Gmail',
	port:465,
	auth:{
	user:'jungle.tunise@gmail.com',
	pass:'Jungle001'
	}
	});

	let mailOptions={
	from:data.email,
	to:'jungle.tunise@gmail.com',
	subject:`Message form ${data.name}`,
	html:`
	<h3>
	information
	</h3>
	<ul>
	<li>name :${data.full_name}</li>
	<li>name :${data.email}</li>
	<li>name :${data.message}</li>
	</ul>
	`
	};
	smtp.sendMail(mailOptions,(error,response)=>{
	if(error){
	res.send(error)
	}
	else{
	res.send('Success')
	}
	})
	stmpTransport.close();
	})