const ContentBasedRecommender = require('content-based-recommender')
const mongoose=require('mongoose');
const recommender = new ContentBasedRecommender({
    minScore: 0.1,
    maxSimilarDocuments: 100
  });

  require("./src/db/conn");
  const port = process.env.PORT || 3000
  const db=mongoose.connection;
  
  db.collection("recomsys").find({}).toArray().then((docs)=>{
    console.log(docs)
  })
//   async function recomsys(){
//     const post = await db.collection("recomsys").find().toArray()
    
//   }
//   const posts=recomsys();

//const posts = [
//     {
//       id: 'https://www.youtube.com/watch?v=5_5oE5lgrhw&list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi',
//       content: 'DSA',
//     },
//     {
//       id: 'https://www.youtube.com/watch?v=u8JZ9gU5o4g&list=PLxCzCOWd7aiHcmS4i14bI0VrMbZTUvlTa',
//       content: 'DesignAnalysis and Algorithm',
//     },
//     {
//       id: 'https://www.youtube.com/watch?v=vBURTt97EkA&list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O',
//       content: 'OS',
//     },
//     {
//       id: 'https://www.youtube.com/watch?v=KJgsSFOSQv0',
//       content: 'Introduction to C++ and AI',
//     },
//     {
//       id: 'https://www.youtube.com/watch?v=AGrcyWV7hL8&list=PLrjkTql3jnm-Voi7giH4JITCi6cuZSN42',
//       content: 'OOPs',
//     },
//     {
//       id: 'https://www.youtube.com/watch?v=wjfeGxqAQOY&list=PLrjkTql3jnm-CLxHftqLgkrZbM8fUt0vn',
//       content: 'Database and IS',
//     },
//     {
//       id: 'https://www.youtube.com/watch?v=JFF2vJaN0Cw&list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_',
//       content: 'CN',
//     },
//     {
//       id: 'https://www.youtube.com/watch?v=uB3i-qV6VdM&list=PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI',
//       content: 'AI',
//     },
//   ];

const tags = [
   {
     id: '1',
     content: 'Javascript',
   },
   {
     id: '2',
     content: 'Machine Learning',
   },
   {
     id: '3',
     content: 'Design Analysis',
   },
   {
     id: '4',
     content: 'Operating S',
   },
   {
     id: '5',
     content: 'DSA',
   },
   {
     id: '6',
     content: 'Python',
   },
   {
     id: '7',
     content: 'OOPs',
   },
   {
   id: '8',
   content: 'Database',
   },
   {
    id: '9',
    content: 'DesignAnalysis',
   },
   {
    id: '10',
    content: 'CN',
   },
   {
       id: '11',
       content: 'AI'
   }
 ];

const tagMap = tags.reduce((acc, tag) => {
acc[tag.id] = tag;
return acc;
}, {});

const recommend = new ContentBasedRecommender();

// recommend.trainBidirectional(posts, tags);

// for (let post of posts) {
// const relatedTags = recommend.getSimilarDocuments(post.id);
// const tags = relatedTags.map(t => tagMap[t.id].content);
// console.log(post.content, 'related tags:', tags);
// }



// prepare documents data
const documents = [
  {
      id: 'https://www.youtube.com/watch?v=5_5oE5lgrhw&list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi',
      content: 'DSA',
    },
    {
      id: 'https://www.youtube.com/watch?v=u8JZ9gU5o4g&list=PLxCzCOWd7aiHcmS4i14bI0VrMbZTUvlTa',
      content: 'DesignAnalysis and Algorithm',
    },
    {
      id: 'https://www.youtube.com/watch?v=vBURTt97EkA&list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O',
      content: 'OS',
    },
    {
      id: 'https://www.youtube.com/watch?v=KJgsSFOSQv0',
      content: 'Introduction to C++ and AI',
    },
    {
      id: 'https://www.youtube.com/watch?v=AGrcyWV7hL8&list=PLrjkTql3jnm-Voi7giH4JITCi6cuZSN42',
      content: 'OOPs',
    },
    {
      id: 'https://www.youtube.com/watch?v=wjfeGxqAQOY&list=PLrjkTql3jnm-CLxHftqLgkrZbM8fUt0vn',
      content: 'Database and IS',
    },
    {
      id: 'https://www.youtube.com/watch?v=JFF2vJaN0Cw&list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_',
      content: 'CN',
    },
    {
      id: 'https://www.youtube.com/watch?v=uB3i-qV6VdM&list=PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI',
      content: 'AI',
    }
];

// start training
recommender.train(posts);

//get top 10 similar items 
const similarDocuments = recommender.getSimilarDocuments('https://www.youtube.com/watch?v=KJgsSFOSQv0', 0, 10);

console.log(similarDocuments);
