const { Post } = require('../../models/Post');


const postResolver = {
    // Query to get all posts that have been posted or to get a single post
    Query: {
        getPosts: async() => {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts
            } catch (error) {
                throw new Error('Cannot Find Posts');
            }
        },
        getSinglePost: async(parent, { postId }) => {
            try {
                const post = await Post.findById(postId);
                if(post){ 
                    return post
                }
            } catch (error) {   
                throw new Error('Cannot Find Post');
            }
        },
        // Mutations to allow a new post to be created, to deleta a post, or to like a post
        Mutation: {
            createAPost: async(parent, { content }, context) => {
                // checking authentication for the use
                const user = signToken(context);
                // if statement to prevent a post from being empty
                if(content.trim() === "") {
                    throw new Error('Post cannot be left empty!');
                }
                // object variable with data needed for new post
                const newPost = new Post({
                    content,
                    user: user.id,
                    username: user.username,
                    createdAt: new Data().toISOString()
                });
                // saving new post and then returning the 'Post' variable
                const Post = await newPost.save();
                return Post;
            },
            deleteAPost: async(parent, { postId }, context) => {
                const user = signToken(context);
                try {
                    const post = await Post.findById(postId);
                    if(user.username === post.username) {
                        await post.delete();
                        return 'Post has been deleted!';
                    } else {
                        throw new AuthenticationError('Not authorized to delete post!')
                    }
                } catch (error) {
                    throw new Error(error);
                }   
            },
            likePostCount: async(parent, { postId }, context) => {
                // authentication for user
                const { username } = signToken(context);
                // finding post by id and setting it to a variable
                const post = await Post.findById(postId);
                // setting date to a variable
                const date = new Date().toISOString();
                // setting likes object to variable
                const userLikes = { username, createdAt: date }
                if(post) {
                        post.likes.push(userLikes);
                    await post.save();
                    return post;
                } else {
                    throw new Error('No Post Found!')
                }
            }
        },
    }
}