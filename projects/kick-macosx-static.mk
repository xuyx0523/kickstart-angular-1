#
#   kick-macosx-static.mk -- Makefile to build Embedthis Kickstart for macosx
#

PRODUCT            := kick
VERSION            := 1.0.0
BUILD_NUMBER       := 0
PROFILE            := static
ARCH               := $(shell uname -m | sed 's/i.86/x86/;s/x86_64/x64/;s/arm.*/arm/;s/mips.*/mips/')
CC_ARCH            := $(shell echo $(ARCH) | sed 's/x86/i686/;s/x64/x86_64/')
OS                 := macosx
CC                 := clang
LD                 := link
CONFIG             := $(OS)-$(ARCH)-$(PROFILE)
LBIN               := $(CONFIG)/bin

BIT_PACK_APPWEB    := 1

ifeq ($(BIT_PACK_LIB),1)
    BIT_PACK_COMPILER := 1
endif

BIT_PACK_APPWEB_PATH      := /usr/local/lib/appweb/latest
BIT_PACK_COMPILER_PATH    := clang
BIT_PACK_LIB_PATH         := ar
BIT_PACK_LINK_PATH        := link

CFLAGS             += -O2  -w
DFLAGS             +=  $(patsubst %,-D%,$(filter BIT_%,$(MAKEFLAGS))) -DBIT_PACK_APPWEB=$(BIT_PACK_APPWEB) 
IFLAGS             += "-I$(CONFIG)/inc"
LDFLAGS            += '-Wl,-rpath,@executable_path/' '-Wl,-rpath,@loader_path/'
LIBPATHS           += -L$(CONFIG)/bin
LIBS               += -ldl -lpthread -lm

DEBUG              := debug
CFLAGS-debug       := -g
DFLAGS-debug       := -DBIT_DEBUG
LDFLAGS-debug      := -g
DFLAGS-release     := 
CFLAGS-release     := -O2
LDFLAGS-release    := 
CFLAGS             += $(CFLAGS-$(DEBUG))
DFLAGS             += $(DFLAGS-$(DEBUG))
LDFLAGS            += $(LDFLAGS-$(DEBUG))

BIT_ROOT_PREFIX    := 
BIT_BASE_PREFIX    := $(BIT_ROOT_PREFIX)/usr/local
BIT_DATA_PREFIX    := $(BIT_ROOT_PREFIX)/
BIT_STATE_PREFIX   := $(BIT_ROOT_PREFIX)/var
BIT_APP_PREFIX     := $(BIT_BASE_PREFIX)/lib/$(PRODUCT)
BIT_VAPP_PREFIX    := $(BIT_APP_PREFIX)/$(VERSION)
BIT_BIN_PREFIX     := $(BIT_ROOT_PREFIX)/usr/local/bin
BIT_INC_PREFIX     := $(BIT_ROOT_PREFIX)/usr/local/include
BIT_LIB_PREFIX     := $(BIT_ROOT_PREFIX)/usr/local/lib
BIT_MAN_PREFIX     := $(BIT_ROOT_PREFIX)/usr/local/share/man
BIT_SBIN_PREFIX    := $(BIT_ROOT_PREFIX)/usr/local/sbin
BIT_ETC_PREFIX     := $(BIT_ROOT_PREFIX)/etc/$(PRODUCT)
BIT_WEB_PREFIX     := $(BIT_ROOT_PREFIX)/var/www/$(PRODUCT)-default
BIT_LOG_PREFIX     := $(BIT_ROOT_PREFIX)/var/log/$(PRODUCT)
BIT_SPOOL_PREFIX   := $(BIT_ROOT_PREFIX)/var/spool/$(PRODUCT)
BIT_CACHE_PREFIX   := $(BIT_ROOT_PREFIX)/var/spool/$(PRODUCT)/cache
BIT_SRC_PREFIX     := $(BIT_ROOT_PREFIX)$(PRODUCT)-$(VERSION)


TARGETS            += client/css/all-1.0.0.min.css
TARGETS            += client/css/all-1.0.0.min.css.gz
TARGETS            += client/app/all.html.js
TARGETS            += client/app/all.html.js
TARGETS            += client/all-1.0.0.min.js
TARGETS            += client/all-1.0.0.min.js
TARGETS            += client/all-1.0.0.min.js.gz

unexport CDPATH

ifndef SHOW
.SILENT:
endif

all build compile: prep $(TARGETS)

.PHONY: prep

prep:
	@echo "      [Info] Use "make SHOW=1" to trace executed commands."
	@if [ "$(CONFIG)" = "" ] ; then echo WARNING: CONFIG not set ; exit 255 ; fi
	@if [ "$(BIT_APP_PREFIX)" = "" ] ; then echo WARNING: BIT_APP_PREFIX not set ; exit 255 ; fi
	@[ ! -x $(CONFIG)/bin ] && mkdir -p $(CONFIG)/bin; true
	@[ ! -x $(CONFIG)/inc ] && mkdir -p $(CONFIG)/inc; true
	@[ ! -x $(CONFIG)/obj ] && mkdir -p $(CONFIG)/obj; true
	@[ ! -f $(CONFIG)/inc/bit.h ] && cp projects/kick-macosx-static-bit.h $(CONFIG)/inc/bit.h ; true
	@if ! diff $(CONFIG)/inc/bit.h projects/kick-macosx-static-bit.h >/dev/null ; then\
		cp projects/kick-macosx-static-bit.h $(CONFIG)/inc/bit.h  ; \
	fi; true
	@if [ -f "$(CONFIG)/.makeflags" ] ; then \
		if [ "$(MAKEFLAGS)" != " ` cat $(CONFIG)/.makeflags`" ] ; then \
			echo "   [Warning] Make flags have changed since the last build: "`cat $(CONFIG)/.makeflags`"" ; \
		fi ; \
	fi
	@echo $(MAKEFLAGS) >$(CONFIG)/.makeflags

clean:

clobber: clean
	rm -fr ./$(CONFIG)



#
#   version
#
version: $(DEPS_1)
	@echo 1.0.0-0










#
#   stop
#
stop: $(DEPS_2)

#
#   installBinary
#
installBinary: $(DEPS_3)
	mkdir -p "/"
	cp appweb.conf /appweb.conf
	cp hosted.conf /hosted.conf
	cp esp.json /esp.json
	mkdir -p "/client"
	cp client/index.esp /client/index.esp
	cp client/all-1.0.0.min.js.gz /client/all-1.0.0.min.js.gz
	mkdir -p "/client/css"
	cp client/css/all-1.0.0.min.*.gz /client/css/all-1.0.0.min.*.gz
	mkdir -p "/client/assets"
	cp client/assets/favicon.ico /client/assets/favicon.ico
	cp client/assets/grid_noise.png /client/assets/grid_noise.png
	cp client/assets/linen.png /client/assets/linen.png
	cp client/assets/sunset.jpg /client/assets/sunset.jpg
	mkdir -p "/client/lib/bootstrap/fonts"
	cp client/lib/bootstrap/fonts/glyphicons-halflings-regular.eot /client/lib/bootstrap/fonts/glyphicons-halflings-regular.eot
	cp client/lib/bootstrap/fonts/glyphicons-halflings-regular.svg /client/lib/bootstrap/fonts/glyphicons-halflings-regular.svg
	cp client/lib/bootstrap/fonts/glyphicons-halflings-regular.ttf /client/lib/bootstrap/fonts/glyphicons-halflings-regular.ttf
	cp client/lib/bootstrap/fonts/glyphicons-halflings-regular.woff /client/lib/bootstrap/fonts/glyphicons-halflings-regular.woff
	mkdir -p "/client/lib/font-awesome/fonts"
	cp client/lib/font-awesome/fonts/fontawesome-webfont.eot /client/lib/font-awesome/fonts/fontawesome-webfont.eot
	cp client/lib/font-awesome/fonts/fontawesome-webfont.svg /client/lib/font-awesome/fonts/fontawesome-webfont.svg
	cp client/lib/font-awesome/fonts/fontawesome-webfont.ttf /client/lib/font-awesome/fonts/fontawesome-webfont.ttf
	cp client/lib/font-awesome/fonts/fontawesome-webfont.woff /client/lib/font-awesome/fonts/fontawesome-webfont.woff
	cp client/lib/font-awesome/fonts/FontAwesome.otf /client/lib/font-awesome/fonts/FontAwesome.otf
	mkdir -p "/cache"
	cp cache/app_3ca919087b84fe779f4804222110add7.dylib /cache/app_3ca919087b84fe779f4804222110add7.dylib
	cp cache/controller_01b72c2c6fe8cbf3d3b3fa0e8049419c.dylib /cache/controller_01b72c2c6fe8cbf3d3b3fa0e8049419c.dylib
	cp cache/controller_1aba15fe6e31f2109b01553e8e68e78e.dylib /cache/controller_1aba15fe6e31f2109b01553e8e68e78e.dylib
	cp cache/controller_334fdc191a00c718c8c765e00a79466d.dylib /cache/controller_334fdc191a00c718c8c765e00a79466d.dylib
	cp cache/controller_3d936798245edcc0ddb1334c751b1312.dylib /cache/controller_3d936798245edcc0ddb1334c751b1312.dylib
	cp cache/controller_3df9eca88b8bb1d92c75b65180a8ef80.dylib /cache/controller_3df9eca88b8bb1d92c75b65180a8ef80.dylib
	cp cache/controller_72d321bb855e3d34368fa643af0e9a0c.dylib /cache/controller_72d321bb855e3d34368fa643af0e9a0c.dylib
	cp cache/controller_886d4847c82aba55d4dd44f1cc5aba70.dylib /cache/controller_886d4847c82aba55d4dd44f1cc5aba70.dylib
	cp cache/controller_9bd4d87c3f479d3449278bfc165be143.dylib /cache/controller_9bd4d87c3f479d3449278bfc165be143.dylib
	cp cache/controller_c9fc6b13d4f842d40c3020b2a803c839.dylib /cache/controller_c9fc6b13d4f842d40c3020b2a803c839.dylib
	cp cache/controller_ce5d973194a100f3208dcfa664ca672f.dylib /cache/controller_ce5d973194a100f3208dcfa664ca672f.dylib
	cp cache/controller_e63cffce00b984793065b29c604cccb2.dylib /cache/controller_e63cffce00b984793065b29c604cccb2.dylib
	cp cache/view_48547d50c94180de2d6178cf0b323f0b.dylib /cache/view_48547d50c94180de2d6178cf0b323f0b.dylib
	mkdir -p "/db"
	cp db/kick.mdb /db/kick.mdb

#
#   start
#
start: $(DEPS_4)

#
#   install
#
DEPS_5 += stop
DEPS_5 += installBinary
DEPS_5 += start

install: $(DEPS_5)
	

#
#   uninstall
#
DEPS_6 += stop

uninstall: $(DEPS_6)

#
#   run
#
DEPS_7 += comp

run: $(DEPS_7)
	esp run
