#
#   kick-freebsd-default.mk -- Makefile to build Embedthis Kickstart for freebsd
#

PRODUCT            := kick
VERSION            := 1.0.0
BUILD_NUMBER       := 0
PROFILE            := default
ARCH               := $(shell uname -m | sed 's/i.86/x86/;s/x86_64/x64/;s/arm.*/arm/;s/mips.*/mips/')
CC_ARCH            := $(shell echo $(ARCH) | sed 's/x86/i686/;s/x64/x86_64/')
OS                 := freebsd
CC                 := gcc
LD                 := link
CONFIG             := $(OS)-$(ARCH)-$(PROFILE)
LBIN               := $(CONFIG)/bin

BIT_PACK_APPWEB    := 1

ifeq ($(BIT_PACK_LIB),1)
    BIT_PACK_COMPILER := 1
endif

BIT_PACK_APPWEB_PATH      := /usr/local/lib/appweb/latest
BIT_PACK_COMPILER_PATH    := gcc
BIT_PACK_LIB_PATH         := ar
BIT_PACK_LINK_PATH        := link

CFLAGS             += -O2 -fPIC -w
DFLAGS             += -D_REENTRANT -DPIC $(patsubst %,-D%,$(filter BIT_%,$(MAKEFLAGS))) -DBIT_PACK_APPWEB=$(BIT_PACK_APPWEB) 
IFLAGS             += "-I$(CONFIG)/inc"
LDFLAGS            += 
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
	@[ ! -f $(CONFIG)/inc/bit.h ] && cp projects/kick-freebsd-default-bit.h $(CONFIG)/inc/bit.h ; true
	@if ! diff $(CONFIG)/inc/bit.h projects/kick-freebsd-default-bit.h >/dev/null ; then\
		cp projects/kick-freebsd-default-bit.h $(CONFIG)/inc/bit.h  ; \
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
	mkdir -p "${root}"
	cp app.conf ${root}/app.conf
	cp appweb.conf ${root}/appweb.conf
	mkdir -p "."
	cp config.json ${root}
	mkdir -p "${root}/client"
	cp client/index.esp ${root}/client/index.esp
	cp client/all-1.0.0.min.js.gz ${root}/client/all-1.0.0.min.js.gz
	mkdir -p "${root}/client/css"
	cp client/css/all-1.0.0.min.css.gz ${root}/client/css/all-1.0.0.min.css.gz
	mkdir -p "${root}/client/assets"
	cp client/assets/favicon.ico ${root}/client/assets/favicon.ico
	cp client/assets/grid_noise.png ${root}/client/assets/grid_noise.png
	cp client/assets/linen.png ${root}/client/assets/linen.png
	cp client/assets/sunset.jpg ${root}/client/assets/sunset.jpg
	mkdir -p "${root}/client/lib/bootstrap/fonts"
	cp client/lib/bootstrap/fonts/glyphicons-halflings-regular.eot ${root}/client/lib/bootstrap/fonts/glyphicons-halflings-regular.eot
	cp client/lib/bootstrap/fonts/glyphicons-halflings-regular.svg ${root}/client/lib/bootstrap/fonts/glyphicons-halflings-regular.svg
	cp client/lib/bootstrap/fonts/glyphicons-halflings-regular.ttf ${root}/client/lib/bootstrap/fonts/glyphicons-halflings-regular.ttf
	cp client/lib/bootstrap/fonts/glyphicons-halflings-regular.woff ${root}/client/lib/bootstrap/fonts/glyphicons-halflings-regular.woff
	mkdir -p "${root}/client/lib/font-awesome/fonts"
	cp client/lib/font-awesome/fonts/fontawesome-webfont.eot ${root}/client/lib/font-awesome/fonts/fontawesome-webfont.eot
	cp client/lib/font-awesome/fonts/fontawesome-webfont.svg ${root}/client/lib/font-awesome/fonts/fontawesome-webfont.svg
	cp client/lib/font-awesome/fonts/fontawesome-webfont.ttf ${root}/client/lib/font-awesome/fonts/fontawesome-webfont.ttf
	cp client/lib/font-awesome/fonts/fontawesome-webfont.woff ${root}/client/lib/font-awesome/fonts/fontawesome-webfont.woff
	cp client/lib/font-awesome/fonts/FontAwesome.otf ${root}/client/lib/font-awesome/fonts/FontAwesome.otf
	mkdir -p "${root}/cache"
	cp cache/kick.dylib ${root}/cache/kick.dylib
	mkdir -p "${root}/db"
	cp db/kick.mdb ${root}/db/kick.mdb

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
