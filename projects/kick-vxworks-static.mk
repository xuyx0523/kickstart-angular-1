#
#   kick-vxworks-static.mk -- Makefile to build Embedthis Kickstart for vxworks
#

PRODUCT            := kick
VERSION            := 1.0.0
BUILD_NUMBER       := 0
PROFILE            := static
ARCH               := $(shell echo $(WIND_HOST_TYPE) | sed 's/-.*//')
CPU                := $(subst X86,PENTIUM,$(shell echo $(ARCH) | tr a-z A-Z))
OS                 := vxworks
CC                 := cc$(subst x86,pentium,$(ARCH))
LD                 := link
CONFIG             := $(OS)-$(ARCH)-$(PROFILE)
LBIN               := $(CONFIG)/bin

BIT_PACK_APPWEB    := 1

ifeq ($(BIT_PACK_LIB),1)
    BIT_PACK_COMPILER := 1
endif

BIT_PACK_APPWEB_PATH      := /usr/local/lib/appweb/latest
BIT_PACK_COMPILER_PATH    := cc$(subst x86,pentium,$(ARCH))
BIT_PACK_LIB_PATH         := ar
BIT_PACK_LINK_PATH        := link
BIT_PACK_VXWORKS_PATH     := $(WIND_BASE)

export WIND_HOME          := $(WIND_BASE)/..
export PATH               := $(WIND_GNU_PATH)/$(WIND_HOST_TYPE)/bin:$(PATH)

CFLAGS             += -fno-builtin -fno-defer-pop -fvolatile -w
DFLAGS             += -DVXWORKS -DRW_MULTI_THREAD -D_GNU_TOOL -DCPU=PENTIUM $(patsubst %,-D%,$(filter BIT_%,$(MAKEFLAGS))) -DBIT_PACK_APPWEB=$(BIT_PACK_APPWEB) 
IFLAGS             += "-I$(CONFIG)/inc -I$(WIND_BASE)/target/h -I$(WIND_BASE)/target/h/wrn/coreip"
LDFLAGS            += '-Wl,-r'
LIBPATHS           += -L$(CONFIG)/bin
LIBS               += -lgcc

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

BIT_ROOT_PREFIX    := deploy
BIT_BASE_PREFIX    := $(BIT_ROOT_PREFIX)
BIT_DATA_PREFIX    := $(BIT_VAPP_PREFIX)
BIT_STATE_PREFIX   := $(BIT_VAPP_PREFIX)
BIT_BIN_PREFIX     := $(BIT_VAPP_PREFIX)
BIT_INC_PREFIX     := $(BIT_VAPP_PREFIX)/inc
BIT_LIB_PREFIX     := $(BIT_VAPP_PREFIX)
BIT_MAN_PREFIX     := $(BIT_VAPP_PREFIX)
BIT_SBIN_PREFIX    := $(BIT_VAPP_PREFIX)
BIT_ETC_PREFIX     := $(BIT_VAPP_PREFIX)
BIT_WEB_PREFIX     := $(BIT_VAPP_PREFIX)/web
BIT_LOG_PREFIX     := $(BIT_VAPP_PREFIX)
BIT_SPOOL_PREFIX   := $(BIT_VAPP_PREFIX)
BIT_CACHE_PREFIX   := $(BIT_VAPP_PREFIX)
BIT_APP_PREFIX     := $(BIT_BASE_PREFIX)
BIT_VAPP_PREFIX    := $(BIT_APP_PREFIX)
BIT_SRC_PREFIX     := $(BIT_ROOT_PREFIX)/usr/src/$(PRODUCT)-$(VERSION)


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
	@if [ "$(WIND_BASE)" = "" ] ; then echo WARNING: WIND_BASE not set. Run wrenv.sh. ; exit 255 ; fi
	@if [ "$(WIND_HOST_TYPE)" = "" ] ; then echo WARNING: WIND_HOST_TYPE not set. Run wrenv.sh. ; exit 255 ; fi
	@if [ "$(WIND_GNU_PATH)" = "" ] ; then echo WARNING: WIND_GNU_PATH not set. Run wrenv.sh. ; exit 255 ; fi
	@[ ! -x $(CONFIG)/bin ] && mkdir -p $(CONFIG)/bin; true
	@[ ! -x $(CONFIG)/inc ] && mkdir -p $(CONFIG)/inc; true
	@[ ! -x $(CONFIG)/obj ] && mkdir -p $(CONFIG)/obj; true
	@[ ! -f $(CONFIG)/inc/bit.h ] && cp projects/kick-vxworks-static-bit.h $(CONFIG)/inc/bit.h ; true
	@if ! diff $(CONFIG)/inc/bit.h projects/kick-vxworks-static-bit.h >/dev/null ; then\
		cp projects/kick-vxworks-static-bit.h $(CONFIG)/inc/bit.h  ; \
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
	mkdir -p "$(BIT_VAPP_PREFIX)"
	cp appweb.conf $(BIT_VAPP_PREFIX)/appweb.conf
	cp hosted.conf $(BIT_VAPP_PREFIX)/hosted.conf
	mkdir -p "."
	cp esp.json $(BIT_VAPP_PREFIX)
	mkdir -p "$(BIT_VAPP_PREFIX)/client"
	cp client/index.esp $(BIT_VAPP_PREFIX)/client/index.esp
	cp client/all-1.0.0.min.js.gz $(BIT_VAPP_PREFIX)/client/all-1.0.0.min.js.gz
	mkdir -p "$(BIT_VAPP_PREFIX)/client/css"
	cp client/css/all-1.0.0.min.*.gz $(BIT_VAPP_PREFIX)/client/css/all-1.0.0.min.*.gz
	mkdir -p "$(BIT_VAPP_PREFIX)/client/assets"
	cp client/assets/favicon.ico $(BIT_VAPP_PREFIX)/client/assets/favicon.ico
	cp client/assets/grid_noise.png $(BIT_VAPP_PREFIX)/client/assets/grid_noise.png
	cp client/assets/linen.png $(BIT_VAPP_PREFIX)/client/assets/linen.png
	cp client/assets/sunset.jpg $(BIT_VAPP_PREFIX)/client/assets/sunset.jpg
	mkdir -p "$(BIT_VAPP_PREFIX)/client/lib/bootstrap/fonts"
	cp client/lib/bootstrap/fonts/glyphicons-halflings-regular.eot $(BIT_VAPP_PREFIX)/client/lib/bootstrap/fonts/glyphicons-halflings-regular.eot
	cp client/lib/bootstrap/fonts/glyphicons-halflings-regular.svg $(BIT_VAPP_PREFIX)/client/lib/bootstrap/fonts/glyphicons-halflings-regular.svg
	cp client/lib/bootstrap/fonts/glyphicons-halflings-regular.ttf $(BIT_VAPP_PREFIX)/client/lib/bootstrap/fonts/glyphicons-halflings-regular.ttf
	cp client/lib/bootstrap/fonts/glyphicons-halflings-regular.woff $(BIT_VAPP_PREFIX)/client/lib/bootstrap/fonts/glyphicons-halflings-regular.woff
	mkdir -p "$(BIT_VAPP_PREFIX)/client/lib/font-awesome/fonts"
	cp client/lib/font-awesome/fonts/fontawesome-webfont.eot $(BIT_VAPP_PREFIX)/client/lib/font-awesome/fonts/fontawesome-webfont.eot
	cp client/lib/font-awesome/fonts/fontawesome-webfont.svg $(BIT_VAPP_PREFIX)/client/lib/font-awesome/fonts/fontawesome-webfont.svg
	cp client/lib/font-awesome/fonts/fontawesome-webfont.ttf $(BIT_VAPP_PREFIX)/client/lib/font-awesome/fonts/fontawesome-webfont.ttf
	cp client/lib/font-awesome/fonts/fontawesome-webfont.woff $(BIT_VAPP_PREFIX)/client/lib/font-awesome/fonts/fontawesome-webfont.woff
	cp client/lib/font-awesome/fonts/FontAwesome.otf $(BIT_VAPP_PREFIX)/client/lib/font-awesome/fonts/FontAwesome.otf
	mkdir -p "$(BIT_VAPP_PREFIX)/cache"
	cp cache/app_3ca919087b84fe779f4804222110add7.dylib $(BIT_VAPP_PREFIX)/cache/app_3ca919087b84fe779f4804222110add7.dylib
	cp cache/controller_01b72c2c6fe8cbf3d3b3fa0e8049419c.dylib $(BIT_VAPP_PREFIX)/cache/controller_01b72c2c6fe8cbf3d3b3fa0e8049419c.dylib
	cp cache/controller_1aba15fe6e31f2109b01553e8e68e78e.dylib $(BIT_VAPP_PREFIX)/cache/controller_1aba15fe6e31f2109b01553e8e68e78e.dylib
	cp cache/controller_334fdc191a00c718c8c765e00a79466d.dylib $(BIT_VAPP_PREFIX)/cache/controller_334fdc191a00c718c8c765e00a79466d.dylib
	cp cache/controller_3d936798245edcc0ddb1334c751b1312.dylib $(BIT_VAPP_PREFIX)/cache/controller_3d936798245edcc0ddb1334c751b1312.dylib
	cp cache/controller_3df9eca88b8bb1d92c75b65180a8ef80.dylib $(BIT_VAPP_PREFIX)/cache/controller_3df9eca88b8bb1d92c75b65180a8ef80.dylib
	cp cache/controller_72d321bb855e3d34368fa643af0e9a0c.dylib $(BIT_VAPP_PREFIX)/cache/controller_72d321bb855e3d34368fa643af0e9a0c.dylib
	cp cache/controller_886d4847c82aba55d4dd44f1cc5aba70.dylib $(BIT_VAPP_PREFIX)/cache/controller_886d4847c82aba55d4dd44f1cc5aba70.dylib
	cp cache/controller_9bd4d87c3f479d3449278bfc165be143.dylib $(BIT_VAPP_PREFIX)/cache/controller_9bd4d87c3f479d3449278bfc165be143.dylib
	cp cache/controller_c9fc6b13d4f842d40c3020b2a803c839.dylib $(BIT_VAPP_PREFIX)/cache/controller_c9fc6b13d4f842d40c3020b2a803c839.dylib
	cp cache/controller_ce5d973194a100f3208dcfa664ca672f.dylib $(BIT_VAPP_PREFIX)/cache/controller_ce5d973194a100f3208dcfa664ca672f.dylib
	cp cache/controller_e63cffce00b984793065b29c604cccb2.dylib $(BIT_VAPP_PREFIX)/cache/controller_e63cffce00b984793065b29c604cccb2.dylib
	cp cache/view_48547d50c94180de2d6178cf0b323f0b.dylib $(BIT_VAPP_PREFIX)/cache/view_48547d50c94180de2d6178cf0b323f0b.dylib
	mkdir -p "$(BIT_VAPP_PREFIX)/db"
	cp db/kick.mdb $(BIT_VAPP_PREFIX)/db/kick.mdb

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
