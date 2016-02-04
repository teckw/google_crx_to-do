$(document).ready(function(){
	var images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg',];
	$('body').css({'background-image': 'url(bgs/' + images[Math.floor(Math.random() * images.length)] + ')'});
})