const [scrollCount, setScrollCount] = useState(0)
    const regenrateSection = useRef(null);

    // =============== light box start ===============

    const [isOpen, setIsOpen] = useState(0)
    const [index, setIndex] = useState(0)

    const handleClick = (e) => {
        setIsOpen(e)
        setIndex(0)
    }

    const videos =
        bannerVideoLink && bannerVideoLink.map((item, i) => {
            const videoObj = {
                url: `${item.fields.file.url}`,
                type: "video",
            }
            return videoObj
        })
        
    // ============= light box end ================
    
    
    // ============= onscroll animation start ==========

    var updateCounts = 0;

    const calculateScrolling = () => {
        var doc = document.documentElement,
            top = 0
        var keys = { 37: 1, 38: 1, 39: 1, 40: 1 }
        const preventDefault = (e) => {
            e.preventDefault()
        }
        const preventDefaultForScrollKeys = (e) => {
            if (keys[e.keyCode]) {
                preventDefault(e)
                return false
            }
        }
        var supportsPassive = false
        try {
            window.addEventListener(
                'test',
                null,
                Object.defineProperty({}, 'passive', {
                    get: function () {
                        supportsPassive = true
                    },
                }),
            )
        } catch (e) { }

        var wheelEvent =
            'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'

        const handleScroll = (e) => {
            top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
            const element = regenrateSection.current
            const offset = element.offsetTop;
            if (
                offset <= top && updateCounts < 98 ||
                (e.deltaY < 1 || e.keyCode == 38 || e.keyCode == 40) && offset >= top && updateCounts > 0
            ) {
                window.scrollTo({
                    top: offset,
                    left: 0,
                    behavior: 'smooth'
                });
                if ((e.deltaY > 0 || e.keyCode == 40) && updateCounts < 98) {
                    updateCounts = updateCounts + 1;
                    setScrollCount(updateCounts)
                } else if ((e.deltaY < 1 || e.keyCode == 38) && updateCounts > 0) {
                    updateCounts = updateCounts - 1;
                    setScrollCount(updateCounts)
                }
                preventDefault(e)
                preventDefaultForScrollKeys(e)
                setScrollCount(updateCounts)
            } else {
                return true
            }
        }

        window.addEventListener(
            'DOMMouseScroll',
            function (e) {
                handleScroll(e)
            },
            false,
        ) // older FF
        var wheelOpt = supportsPassive ? { passive: false } : false
        window.addEventListener(
            wheelEvent,
            function (e) {
                handleScroll(e)
            },
            wheelOpt,
        ) // modern desktop
        window.addEventListener(
            'touchmove',
            function (e) {
                handleScroll(e)
            },
            wheelOpt,
        ) // mobile
        window.addEventListener(
            'keydown',
            function (e) {
                handleScroll(e)
            },
            false,
        )
    }

    const borders = borderImage && borderImage.map((item) => item.fields.file.url)

    useEffect(() => {
        calculateScrolling()
    }, [])
    
    
    // ================= onscroll animation html code ====================
    {borders && (
                        <Image
                            sx={styles.borderImage}
                            id={scrollCount}
                            src={borders[scrollCount]}
                            alt="border image"
                        />
                    )}
    
    // ==================== light box html code ======================
    
    {!!isOpen && (
                <ReactImageVideoLightbox
                    reactModalStyle={{ content: { direction: 'ltr' } }}
                    data={videos}
                    showResourceCount={true}
                    startIndex={index}
                    onCloseCallback={() => setIsOpen(false)}
                />
            )}
