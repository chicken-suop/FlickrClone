# FlickrClone
Simple photos gallery using Flickr's public API

## Design
I made the main app design using [InVision Studio](https://www.invisionapp.com/studio). I chose not to use sketch, because I wanted to try out Studio, see what it's like, and if I'd recommend using either with, or instead of Sketch.

The main design is inspired by a number of other great designs. I've included most of my inspiration in the [insp](/insp) dir.

The pallet is a simple four colour scheme.

![Palette](/insp/Palette.png)

The app icon, I made in Sketch, using the same colours as Flickr, but with the "copy" icon from https://feathericons.com/. I prefer Sketch for doing simple icons like this – instead of Studio, or any of the adobe products.

![Icon](/assets/media/android-chrome-512x512.png)

## Support
The app supports all major browsers, but I've only styled it for smaller screens (mobile/tablet).

## Features
- [x] get first 25 photos of dogs with captions - author, date
- [x] add infinite scroll
- [x] implement visible error handling from both engineering and user perspectives
- [x] use loading indicators
- [x] add ability to see author’s other pictures
- [x] allow to search for photos of dogs
- [x] add offline functionality and ability to add app to the home-screen
- [x] filter based on parameters: date, colour (?), licence
- [ ] show map of photos using geolocation

## Possible improvements
- On scroll animations, specifically that on the Detail page, are "laggy"
    - This looks to be because of inefficient re-rendering
- Add filter for showing map of photos using geolocation
    - **How I would have done it**
    - I'd add a new button on the filters overlay "Show map"
    - this would change the feed to a map mode
    - I'd use google maps, and this api method: ``
    - I'd keep the search box floating above, but hide it whenever the user pans the map
    - I'd lazyload the data based on the viewable area
- Add more animations and transitions were applicable
    - Especially when transitioning between feed and detail pages
- Replace "Loading..." text with nicer animations
    - Very obvious when going from feed to detail, or detail to another detail page
- Better error handling
    - Currently, only supporting most common errors
    - Should support all api errors, and provide way for user to reset/escape from error
- Add more filters
- Work on my webpack configs
    - Also, learn webpack better
