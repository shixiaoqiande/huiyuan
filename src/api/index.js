const query = Bmob.Query('vipuser');
const shangpin = Bmob.Query('vipshop');
const usershop = Bmob.Query('usershop');

// 获取 用户信息
export let getMemberInfo = () => {
    return query.find()
}

// 修改用户信息
export let resetMemberInfo = (objectId, key, value) => {
    query.get(objectId).then(res => {
        // console.log(res)
        res.set(key, value)
        res.save()
    }).catch(err => {
        // console.log(err)
    })
}

// 删除 用户信息
export let deleteMemberInfo = (objectId) => {
    query.destroy(objectId).then(res => {
        // console.log(res)
    }).catch(err => {
        // console.log(err)
    })
}

// 增加 用户信息
export let addMemberInfo = (name, number, score) => {
    query.set("name", name);
    query.set("number", number);
    query.set("score", score);
    query.save().then(res => {
        // console.log(res)
    }).catch(err => {
        // console.log(err)
    })
}

// 设为管理员
export let setVip = (objectId,key,value) =>{
    query.get(objectId).then(res => {
        // console.log(res)
        res.set(key,value)
        res.save()
    }).catch(err => {
        // console.log(err)
    })
}

// 获取 商品信息
export let getGoodsInfo = () => {
    return shangpin.find()
}

// 修改商品信息
export let updateGoodsInfo = (objectId, key, value) => {
    shangpin.get(objectId).then(res => {
        res.set(key, value)
        res.save()
    }).catch(err => {
        // console.log(err)
    })
}

// 删除商品信息
export let deleteGoodsInfo = (objectId) => {
    shangpin.destroy(objectId).then(res => {
        // console.log(res)
    }).catch(err => {
        // console.log(err)
    })
}

// 新增商品信息
export let addGoodsInfo = (titleValue, PriceValue, imgValue) => {
    shangpin.set("title", titleValue)
    shangpin.set("Price", PriceValue)
    shangpin.set("img", imgValue)
    shangpin.save().then(res => {
        // res.set(key,value)
        // console.log(res)
    }).catch(err => {
        // console.log(err)
    })
}

// 兑换记录
// export let everyUserShop = (title,img,Price,num,userId) =>{
//     usershop.set("title",'11');
//     usershop.set("img",'11');
//     usershop.set("Price",1);
//     usershop.set("num",1);
//     usershop.set("userId",1);
//     shangpin.save().then(res => {
//         // console.log(title,img,Price,num,userId)
//         // console.log(res,'--------')
//     }).catch(err => {
//         // console.log(err)
//     })
// }