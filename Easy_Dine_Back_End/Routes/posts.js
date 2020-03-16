const express = require('express');

const router = express.Router();

const Post = require('../models/users');

const fs = require('fs');



//gets all posts
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (err) {
		res.json({ message: err });
	}
});

//submits a post
router.post('/', async (req, res) => {
	// const post = new Post({
	// 	title: req.body.title,
	// 	description: req.body.description
	// });

	// const savedPost = await post.save();
	// try{
	// 	res.json(savedPost);
	// }catch(err){
	// 	res.json({message: err});
	// }
	var jsonData = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';

	// parse json
	var jsonObj = JSON.parse(jsonData);
	console.log(jsonObj);

	// stringify JSON Object
	var jsonContent = JSON.stringify(jsonObj);
	console.log(jsonContent);

	fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
		if (err) {
			console.log("An error occured while writing JSON Object to File.");
			return console.log(err);
		}

		console.log("JSON file has been saved.");
	});

});
//specific post
router.get('/:postId', async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		res.json(post);
		console.log(post);
	}
	catch (err) {
		res.json({ message: err });
	}
});

//Delete specific post
router.delete('/:postId', async (req, res) => {
	try {
		const removedPost = await Post.remove({ _id: req.params.postId });
		res.json(removedPost);
	}
	catch (err) {
		res.json({ message: err })
	}
});

//Update a post
router.patch('/:postId', async (req, res) => {
	try {
		const updatedPost = await Post.updateOne(
			{ _id: req.params.postId },
			{ $set: { title: req.body.title } }
		);
		res.json(updatedPost);
	}
	catch (err) {
		res.json({ message: err });
	}
});






module.exports = router;