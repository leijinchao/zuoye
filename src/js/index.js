var Swiper = new Swiper(".swiper-container", {
    pagination: {
        el: '.swiper-pagination',
    },
})
var myBscroll = new BScroll("section", {
    scrollY: true,
    probeType: 2,
    click: true,
})


$.ajax({
    url: "/api/list",
    success: function(opt) {
        var data = JSON.parse(opt)
        if (data.code == 0) {
            change(data.data.list)
        } else {
            console.log("数据错误")
        }
    }
})
var page = 0;

function change(opt) {
    var str = ""
    opt.forEach(function(item) {
        str += `<dl>
                    <dt><img src="${item.images}" alt=""></dt>
                    <dd>
                        <h3>${item.name}</h3>
                        <p>${item.site}</p>
                        <div class="dl-M">
                            <div class="dl-M-M">
                                <div class="month"><b>${item.month}</b>元</div>
                                <span>门市价:${item.oldMonth}元</span>
                            </div>
                            <div class="num">已售${item.num}</div>
                        </div>
                    </dd>
                </dl>`
    })
    $(".advertisingBox").html(str);
}

function init() {
    $.ajax({
        url: "/api/list",
        success: function(opt) {
            var data = JSON.parse(opt)
            if (data.code == 0) {
                var str = ""
                data.data.list.forEach(function(item) {
                    str += `<dl>
                                <dt><img src="${item.images}" alt=""></dt>
                                <dd>
                                    <h3>${item.name}</h3>
                                    <p>${item.site}</p>
                                    <div class="dl-M">
                                        <div class="dl-M-M">
                                            <div class="month"><b>${item.month}</b>元</div>
                                            <span>门市价:${item.oldMonth}元</span>
                                        </div>
                                        <div class="num">已售${item.num}</div>
                                    </div>
                                </dd>
                            </dl>`
                })
                $(".advertisingBox").append(str);
            } else {
                console.log("数据错误")
            }
        }
    })

}
myBscroll.on("scroll", function() {
    if (this.y <= this.maxScrollY - 50) {
        if (page < 5) {
            $(".srollDown").html("下拉加载...").addClass("flip")
        } else {
            $(".srollDown").html("-----我也是有底线的-----")
        }
    } else if (this.y <= this.maxScrollY - 15) {
        $(".srollDown").html("使劲往上拉").removeClass("flip")
    } else if (this.y >= 50) {
        $(".srollUp").html("下拉刷新...").addClass("flip")
    } else if (this.y >= 15) {
        $(".srollUp").html("使劲往下拉").removeClass("flip")
    }
})

myBscroll.on("touchEnd", function() {
    if ($(".srollDown").hasClass("flip")) {
        $(".srollDown").html("下拉加载...").removeClass("flip")
        pullDown()
    } else if ($(".srollUp").hasClass("flip")) {
        $(".srollUp").html("下拉刷新...").removeClass("flip")
        pullUp()
    }
});

function pullDown() {
    page++;
    init()
}

function pullUp() {
    $(".advertisingBox").html(" ")
    init()
}


$("#inps").on("input", function() {
    var inpVal = $(this).val();
    if (inpVal !== "") {
        $(".newSeek").removeClass("active");
        $.ajax({
            url: "/Api/seek",
            success: function(opt) {
                var data = JSON.parse(opt);
                if (data.code == 0) {
                    seekNames(data.data, inpVal)
                } else {
                    console.log("错误")
                }

            }
        })
    } else {
        $(".newSeek").addClass("active");
    }
})

function seekNames(opt, inpVal) {
    var html = "";
    opt.forEach(function(item) {
        if (item.name[0].indexOf(inpVal) != -1 || item.name[1].indexOf(inpVal) != -1 || item.name[2].indexOf(inpVal) != -1) {
            html += `<li>${item.name[0]}</li>`
        }
    })
    $(".newSeek").html(html)
}