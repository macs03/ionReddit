import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RedditService } from '../../app/services/reddit.service';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-reddits',
  templateUrl: 'reddits.html',
  providers: [RedditService]
})
export class RedditsPage {

  items: any[];
  category: any;
  limit: any;

  constructor(public navCtrl: NavController, private redditService: RedditService) {
    this.redditService = redditService;
    this.getDefaults();
  }

  ngOnInit() {
    this.getPosts(this.category, this.limit);
  }

  getDefaults() {
    if (localStorage.getItem('category') != null) {
      this.category = localStorage.getItem('category');
    } else {
      this.category = "sports"
    }

    if (localStorage.getItem('limit') != null) {
      this.limit = localStorage.getItem('limit');
    } else {
      this.limit = 10;
    }
  }

  getPosts(category, limit) {
    this.redditService.getPosts(category, limit).subscribe(posts => {
      this.items = posts.data.children;
    });
  }

  viewItem(item) {
    this.navCtrl.push(DetailsPage, { item: item });
  }

  changeCategory() {
    this.getPosts(this.category, this.limit);
  }

}
