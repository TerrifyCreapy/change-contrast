function adjustContrast(contrastR, contrastG, contrastB, contrastALL, ctx, width, height) {
    let imgData = ctx.getImageData(0, 0, width, height);
    let data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
        data[i] = truncFunc((data[i] - 128) * contrastR + 128);
        data[i + 1] = truncFunc((data[i + 1] - 128) * contrastG + 128)
        data[i + 2] = truncFunc((data[i + 2] - 128) * contrastB + 128);
    }

    ctx.putImageData(imgData, 0, 0);
}

function truncFunc(value) {
    return Math.max(0, Math.min(255, value));
}

function main() {
    let src = null;

    const canvas = document.getElementById("canvas");
    const fileUpload = document.getElementById("file");
    const r = document.getElementById("r"), g = document.getElementById("g"), b = document.getElementById("b"),
        all = document.getElementById("all");
    r.value = 1, g.value = 1, b.value = 1, all.value = 1;

    const ctx = canvas.getContext("2d");

    fileUpload.addEventListener("change", function (event) {
        const file = event.target.files[0];
        const fr = new FileReader();
        r.value = 1, g.value = 1, b.value = 1, all.value = 1;

        fr.onload = function (event) {
            src = event.target.result;
            const img = new Image();
            img.src = src;
            img.onload = function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                adjustContrast(1, 1, 1, 1, ctx, canvas.width, canvas.height);
            }
        }

        fr.readAsDataURL(file);



    });

    function change() {
        let info = document.getElementById("info");
        info.innerHTML = `<li>${Math.trunc((r.value - 1) * 100)}</li> <li>${Math.trunc((g.value - 1) * 100)}</li> <li>${Math.trunc((b.value - 1) * 100)}</li>`;
    }

    r.addEventListener("change", function (event) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = new Image();
        img.src = src;
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            adjustContrast(event.target.value, g.value, b.value, 1, ctx, canvas.width, canvas.height);
            change();
        }


    });
    g.addEventListener("change", function (event) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = new Image();
        img.src = src;
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            adjustContrast(r.value, event.target.value, b.value, 1, ctx, canvas.width, canvas.height);
            change();
        }
    });
    b.addEventListener("change", function (event) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = new Image();
        img.src = src;
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            adjustContrast(r.value, g.value, event.target.value, 1, ctx, canvas.width, canvas.height);
            change();
        }
    });

    all.addEventListener("change", function (event) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = new Image();
        img.src = src;
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            r.value = event.target.value, g.value = event.target.value, b.value = event.target.value;
            change();
            adjustContrast(event.target.value, event.target.value, event.target.value, 1, ctx, canvas.width, canvas.height);
        }
    })
};

main();