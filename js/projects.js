/* ===== PROJECT PHOTO ENGINE =====
   OPTION A (any host): put images in an /images folder and list them below.
   OPTION B (recommended, no coding to add photos): use a free Cloudinary account.
     1. Paste your Cloudinary cloud name into CLOUD_NAME below.
     2. In Cloudinary, enable Settings > Security > "Resource list" for images.
     3. Upload photos and give each one a tag matching its project:
        chris-sports, stanley, vivaia, vm-all-stars-x-guess, cm-unipessoal,
        wan-tech, tyrone-uniform-hub, the-platinum
        (or set your own tag with {title:'...', tag:'my-tag', images:[]}).
     New photos then appear on the site for every visitor automatically. */
var CLOUD_NAME='';
var PROJECTS=[
  {title:'Chris Sports',images:[]},
  {title:'Stanley',images:[]},
  {title:'VIVAIA',images:[]},
  {title:'VM All Stars x GUESS',images:[]},
  {title:'CM Unipessoal',images:[]},
  {title:'Wan Tech',images:[]},
  {title:'Tyrone Uniform Hub',images:[]},
  {title:'The Platinum',images:[]}
  /* example: {title:'VIVAIA',images:['images/vivaia-1.jpg','images/vivaia-2.jpg']} */
];
