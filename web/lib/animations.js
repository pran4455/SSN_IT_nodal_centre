import gsap from "gsap";

export const animatePageIn = () => {
    const banner = document.getElementById("banner")

    if (banner) {
        const tl = gsap.timeline()

        tl.set([banner], {
            yPercent: 0,
            display:"flex"
        }).to([banner], {
            yPercent: 100,
            duration:1,
            display:"none",
            transition: "easeOut"
        })
    }
}

export const animatePageOut = (href, router) => {
    const banner = document.getElementById("banner")

    if (banner) {
        const tl = gsap.timeline()

        tl.set([banner], {
            yPercent: -100,
            display:"none",
        }).to([banner], {
            yPercent: 0,    
            display:"flex",
            duration:0.4,
            onComplete: () => {
                router.push(href)
            }
        })
    }
}