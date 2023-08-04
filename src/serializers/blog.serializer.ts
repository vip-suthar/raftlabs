import { abstractSerializer } from "./__serializer";

const blogFields: string[] = [
    "_id",
    "title",
    "description",
    "tags",
    "author",
    "createdAt",
    "updatedAt",
];

export const blogSerializer = (blog: any) => abstractSerializer(blog, blogFields);

export const blogsSerializer = (blogs: any) => {
    const data: any[] = [];
    blogs.forEach((blog: any) => {
        data.push(blogSerializer(blog));
    });
    return data;
};