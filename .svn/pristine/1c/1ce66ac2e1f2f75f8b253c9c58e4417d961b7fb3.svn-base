// Components, functions, plugins
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

// Services
import {PostService} from '../../services/post-service';

// Pages
import {PostPage} from '../post/post';
import {UserPage} from '../user/user';

@Component({
  selector: 'page-wall-posts',
  templateUrl: 'wall-posts.html'
})

export class WallPostsPage {
	public posts: any;

	constructor(public nav: NavController, 
				public postService: PostService) {
					
		// get sample data only
		this.posts = postService.getAll();
	}

	toggleLike(post) {
		// if user liked
		if(post.liked) {
		  post.likeCount--;
		} else {
		  post.likeCount++;
		}

		post.liked = !post.liked
	}

	// on click, go to post detail
	viewPost(postId) {
		this.nav.push(PostPage, {id: postId})
	}

	// on click, go to user timeline
	viewUser(userId) {
		this.nav.push(UserPage, {id: userId})
	}
	
}
