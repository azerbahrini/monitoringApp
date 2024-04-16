const { paginate } = require("mongoose-paginate-v2");

module.exports = async (array,page,size) =>  {
    try{
        const pageInt=parseInt(page);
        const sizeInt=parseInt(size);
        const items= array.slice(pageInt * sizeInt, (pageInt * sizeInt)+sizeInt);
        return {status:"success",
        data:
        {
            docs:items,
            totalDocs: array.length,
            offset: pageInt*sizeInt,
            limit: sizeInt,
            totalPages: Math.ceil(array.length / (sizeInt!==0?sizeInt:1)),
            page: pageInt+1,
            pagingCounter: 1,
            hasPrevPage: false,
            hasNextPage: false,
            prevPage: pageInt!==0?pageInt:null,
            nextPage: Math.ceil(array.length / (sizeInt!==0?sizeInt:1))!==pageInt+1?pageInt+2 : null
        }
    };
    }catch (err){
        return { err:err, status: "error" };
    }
}
