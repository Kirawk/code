/**
 * 模型和数据
 */
var User = {
    records: [],
    fetchRemote: function () { }
};
var user = new User;
user.destroy();

var User = function (attrs) {
    this.attributes = attrs || {};
};
User.prototype.destroy = function () {
    /** */
};
User.fetchRemote = function () {
    /** */
};
//构建对象关系映射(ORM)
//原型继承
if (typeof Object.create != "function") {
    Object.create = function (o) {
        function F() { };
        F.prototype = o;
        return new F();
    };
}
var Modal = {
    inherited: function () { },
    created: function () { },
    prototype: {
        init: function () { }
    },
    create: function () {
        var object = object.create(this);
        object.parent = this;
        object.prototype = object.fn = Object.create(this.prototype);

        object.created();
        this.inherited(object);
        return object;
    },
    init: function () {
        var instance = Object.create(this.prototype);
        instance.parent = this;
        instance.init.apply(instance, arguments);
        return instance;
    }
};
var Asset = Modal.create();
var User = Modal.create();

var user = User.init();

/**
 * 添加ORM属性
 */
jQuery.extend(Modal, {
    find: function () { }
});

//天加实力属性
jQuery.extend(Model.prototype, {
    inti: function (atts) {
        if (atts) this.load(atts);
    },
    load: function (attributes) {
        for (var name in attributes)
            this[name] = attributes[name];
    }
});
assertEqual(typeof Asset.find, "function");
var Modal = {
    /** */

    extend: function (o) {
        var extended = o.extended;
        jQuery.extend(this, o);
        if (extended) extended(this);
    },

    include: function (o) {
        var included = o.included;
        jQuery.extend(this.prototype, o);
        if (include) included(this);
    }
};

//添加对象属性
Model.extended({
    find: function () { }
});

//添加实例属性
Modal.include({
    init: function (atts) { },
    load: function (attributes) { }
});

/**
 * 持久化记录
 */
Modal.records = {};
Modal.include({
    newRecord: true,
    create: function () {
        this.newRecord = false;
        this.parent.records[this.id] = this;
    },
    destroy: function () {
        delete this.parent.records[this.id];
    }
});

Modal.include({
    update: function () {
        this.parent.records[this.id] = this;
    }
});
Modal.include({
    save: function () {
        this.newRecord ? this.create() : this.update();
    }
});
Model.extend({
    //通过ID查找，找不到则抛出异常
    find: function (id) {
        return this.records[id] || throw ("Unknow record");
    }
});

var asset = Asset.init();
asset.name = "same,same";
asset.id = 1;
asset.save();

var asset2 = Asset.init();
asset2.name = "but different";
asset2.id = 2;
asset2.save();
asset2.destroy();

/**
 * 增加ID支持
 */
Math.guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}
Model.extend({
    create: function () {
        if (!this.id) this.id = Math.guid(); this.newRecord = false; this.parent.records[this.id] = this;
    }
});

var asset = Asset.init();
asset.save();
asset.id

/**
 * 寻址引用
 */