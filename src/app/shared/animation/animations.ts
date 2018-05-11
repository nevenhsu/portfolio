import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const SLIDE = trigger('slideAnimation', [
  transition('* => void', [
    query('.slide-animation', [
      style({opacity: 1, transform: 'translateY(0px)'}),
      stagger(50, [
        animate('200ms ease-out', style({opacity: 0, transform: 'translateY(8px)'}))
      ])
    ])
  ]),
  transition('* => *', [
    query('.slide-animation', [
      style({opacity: 0, transform: 'translateY(-30px)'}),
      stagger(200, [
        animate('350ms ease-out', style({opacity: 1, transform: 'translateY(0px)'}))
      ])
    ])
  ])
]);

export const FADE = trigger('fade', [
  transition(':leave', [
    style({opacity: 1}),
    animate('500ms ease-out', style({opacity: 0}))
  ]),
  transition(':enter, * => *', [
    style({opacity: 0}),
    animate('500ms ease-out', style({opacity: 1}))
  ])
]);

export const SMALLSLIDE = trigger('smallSlideAnimation', [
  transition('* => void', [
    style({opacity: 1, top: 'translate(-50%, 0px)'}),
    animate('200ms ease-out', style({opacity: 0, transform: 'translate(-50%, 8px)'}))
  ]),
  transition('* => *', [
    style({opacity: 0, transform: 'translate(-50%, -8px)'}),
    animate('350ms ease-out', style({opacity: 1, transform: 'translate(-50%, 0px)'}))
  ])
]);


export const SHRINK = trigger('shrink', [
    transition('void => *', [
        style({height: '1200px'}),
        animate('0.8s ease-out', style({height: 0}))
    ])
]);

