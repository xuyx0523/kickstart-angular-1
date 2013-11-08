/*
    bit.h -- Build It Configuration Header for windows-x86-static

    This header is created by Bit during configuration. To change settings, re-run
    configure or define variables in your Makefile to override these default values.
 */


/* Settings */
#ifndef BIT_BIT
    #define BIT_BIT "0.8.6"
#endif
#ifndef BIT_BUILD_NUMBER
    #define BIT_BUILD_NUMBER "0"
#endif
#ifndef BIT_C_FLAT
    #define BIT_C_FLAT 1
#endif
#ifndef BIT_COMPANY
    #define BIT_COMPANY "Embedthis"
#endif
#ifndef BIT_CSS_COMPRESS
    #define BIT_CSS_COMPRESS 1
#endif
#ifndef BIT_CSS_FLAT
    #define BIT_CSS_FLAT 1
#endif
#ifndef BIT_CSS_MINIFY
    #define BIT_CSS_MINIFY 1
#endif
#ifndef BIT_DEBUG
    #define BIT_DEBUG 1
#endif
#ifndef BIT_DEPTH
    #define BIT_DEPTH 1
#endif
#ifndef BIT_DISCOVER
    #define BIT_DISCOVER ""
#endif
#ifndef BIT_HAS_ATOMIC
    #define BIT_HAS_ATOMIC 0
#endif
#ifndef BIT_HAS_ATOMIC64
    #define BIT_HAS_ATOMIC64 0
#endif
#ifndef BIT_HAS_DYN_LOAD
    #define BIT_HAS_DYN_LOAD 1
#endif
#ifndef BIT_HAS_LIB_EDIT
    #define BIT_HAS_LIB_EDIT 0
#endif
#ifndef BIT_HAS_LIB_RT
    #define BIT_HAS_LIB_RT 0
#endif
#ifndef BIT_HAS_MMU
    #define BIT_HAS_MMU 1
#endif
#ifndef BIT_HAS_STACK_PROTECTOR
    #define BIT_HAS_STACK_PROTECTOR 0
#endif
#ifndef BIT_HAS_SYNC
    #define BIT_HAS_SYNC 0
#endif
#ifndef BIT_HAS_SYNC64
    #define BIT_HAS_SYNC64 0
#endif
#ifndef BIT_HAS_SYNC_CAS
    #define BIT_HAS_SYNC_CAS 0
#endif
#ifndef BIT_HAS_UNNAMED_UNIONS
    #define BIT_HAS_UNNAMED_UNIONS 1
#endif
#ifndef BIT_HTML_COMPRESS
    #define BIT_HTML_COMPRESS 1
#endif
#ifndef BIT_HTML_FLAT
    #define BIT_HTML_FLAT 1
#endif
#ifndef BIT_HTML_MINIFY
    #define BIT_HTML_MINIFY 1
#endif
#ifndef BIT_JS_COMPRESS
    #define BIT_JS_COMPRESS 1
#endif
#ifndef BIT_JS_FLAT
    #define BIT_JS_FLAT 1
#endif
#ifndef BIT_JS_MINIFY
    #define BIT_JS_MINIFY 1
#endif
#ifndef BIT_MANIFEST
    #define BIT_MANIFEST "package/manifest.bit"
#endif
#ifndef BIT_PACKS
    #define BIT_PACKS "bits/packs"
#endif
#ifndef BIT_PREFIXES
    #define BIT_PREFIXES "embedthis-prefixes"
#endif
#ifndef BIT_PRODUCT
    #define BIT_PRODUCT "kick"
#endif
#ifndef BIT_REQUIRES
    #define BIT_REQUIRES "winsdk,compiler,lib,link,rc,appweb"
#endif
#ifndef BIT_STATIC
    #define BIT_STATIC 1
#endif
#ifndef BIT_SYNC
    #define BIT_SYNC ""
#endif
#ifndef BIT_TITLE
    #define BIT_TITLE "Embedthis Kickstart"
#endif
#ifndef BIT_VERSION
    #define BIT_VERSION "1.0.0"
#endif
#ifndef BIT_WITHOUT_ALL
    #define BIT_WITHOUT_ALL ""
#endif

/* Prefixes */
#ifndef BIT_ROOT_PREFIX
    #define BIT_ROOT_PREFIX "C:"
#endif
#ifndef BIT_PROGRAMFILES_PREFIX
    #define BIT_PROGRAMFILES_PREFIX "C:/Program Files"
#endif
#ifndef BIT_PROGRAMFILES32_PREFIX
    #define BIT_PROGRAMFILES32_PREFIX "C:/Program Files"
#endif
#ifndef BIT_BASE_PREFIX
    #define BIT_BASE_PREFIX "C:/Program Files"
#endif
#ifndef BIT_APP_PREFIX
    #define BIT_APP_PREFIX "C:/Program Files/Embedthis Kickstart"
#endif
#ifndef BIT_VAPP_PREFIX
    #define BIT_VAPP_PREFIX "C:/Program Files/Embedthis Kickstart"
#endif
#ifndef BIT_DATA_PREFIX
    #define BIT_DATA_PREFIX "C:/Program Files/Embedthis Kickstart"
#endif
#ifndef BIT_STATE_PREFIX
    #define BIT_STATE_PREFIX "C:/Program Files/Embedthis Kickstart"
#endif
#ifndef BIT_BIN_PREFIX
    #define BIT_BIN_PREFIX "C:/Program Files/Embedthis Kickstart/bin"
#endif
#ifndef BIT_INC_PREFIX
    #define BIT_INC_PREFIX "C:/Program Files/Embedthis Kickstart/inc"
#endif
#ifndef BIT_LIB_PREFIX
    #define BIT_LIB_PREFIX "C:/Program Files/Embedthis Kickstart/lib"
#endif
#ifndef BIT_MAN_PREFIX
    #define BIT_MAN_PREFIX "C:/Program Files/Embedthis Kickstart/man"
#endif
#ifndef BIT_ETC_PREFIX
    #define BIT_ETC_PREFIX "C:/Program Files/Embedthis Kickstart"
#endif
#ifndef BIT_WEB_PREFIX
    #define BIT_WEB_PREFIX "C:/Program Files/Embedthis Kickstart/web"
#endif
#ifndef BIT_LOG_PREFIX
    #define BIT_LOG_PREFIX "C:/Program Files/Embedthis Kickstart/log"
#endif
#ifndef BIT_SPOOL_PREFIX
    #define BIT_SPOOL_PREFIX "C:/Program Files/Embedthis Kickstart/tmp"
#endif
#ifndef BIT_CACHE_PREFIX
    #define BIT_CACHE_PREFIX "C:/Program Files/Embedthis Kickstart/cache"
#endif
#ifndef BIT_SRC_PREFIX
    #define BIT_SRC_PREFIX "C:/Program Files/Embedthis Kickstart/src"
#endif

/* Suffixes */
#ifndef BIT_EXE
    #define BIT_EXE ".exe"
#endif
#ifndef BIT_SHLIB
    #define BIT_SHLIB ".lib"
#endif
#ifndef BIT_SHOBJ
    #define BIT_SHOBJ ".dll"
#endif
#ifndef BIT_LIB
    #define BIT_LIB ".lib"
#endif
#ifndef BIT_OBJ
    #define BIT_OBJ ".obj"
#endif

/* Profile */
#ifndef BIT_CONFIG_CMD
    #define BIT_CONFIG_CMD "bit -d -q -platform windows-x86-static -static -configure . -gen vs"
#endif
#ifndef BIT_KICK_PRODUCT
    #define BIT_KICK_PRODUCT 1
#endif
#ifndef BIT_PROFILE
    #define BIT_PROFILE "static"
#endif
#ifndef BIT_TUNE_SIZE
    #define BIT_TUNE_SIZE 1
#endif

/* Miscellaneous */
#ifndef BIT_MAJOR_VERSION
    #define BIT_MAJOR_VERSION 1
#endif
#ifndef BIT_MINOR_VERSION
    #define BIT_MINOR_VERSION 0
#endif
#ifndef BIT_PATCH_VERSION
    #define BIT_PATCH_VERSION 0
#endif
#ifndef BIT_VNUM
    #define BIT_VNUM 100000000
#endif

/* Packs */
#ifndef BIT_PACK_APPWEB
    #define BIT_PACK_APPWEB 1
#endif
#ifndef BIT_PACK_CC
    #define BIT_PACK_CC 1
#endif
#ifndef BIT_PACK_LIB
    #define BIT_PACK_LIB 1
#endif
#ifndef BIT_PACK_LINK
    #define BIT_PACK_LINK 1
#endif
#ifndef BIT_PACK_RC
    #define BIT_PACK_RC 1
#endif
#ifndef BIT_PACK_VXWORKS
    #define BIT_PACK_VXWORKS 0
#endif
#ifndef BIT_PACK_WINSDK
    #define BIT_PACK_WINSDK 1
#endif
