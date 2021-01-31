import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navSlide(){
    const nav = document.querySelector('.links');
    const burger = document.querySelector('.burger')
    const links = nav.querySelectorAll('li');
    nav.classList.toggle('nav-active');
    //links Animation
    links.forEach((link, index) => {
      if(link.style.animation)
        link.style.animation = '';
      else
        link.style.animation = `navLinkFade .5s ease forwards ${index/10 + .3}s`;
    })
    burger.classList.toggle('toggle');
  }
}
