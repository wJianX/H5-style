

function hendleData() {
    // 模拟数据
    let data = [{ title: "阿松大", content: "啊实打实大苏打" }, { title: "阿松大1", content: "啊实打实大苏打1" }, { title: "阿松大2", content: "啊实打实大苏打2" }]
    let str = ''
    // for (var i = 0; i < data.length; i++) {
    //     str += "<h3>" + data[i].title + "</h3>" + "<div>" + data[i].content + "</div>";
    //     console.log(str)
    // }
    data.forEach((element, i) => {
        str += "<h3>" + element.title + "</h3>" + "<div>" + element.content + "</div>";
    });
    $(".mycollapse").append(str);
}
hendleData()