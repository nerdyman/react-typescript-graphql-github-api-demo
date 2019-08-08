#!/usr/bin/env bash
set -eo pipefail

case $1 in
	start)
		yarn start
		;;
	build)
		yarn build
		;;
	test)
		yarn test "$@"
		;;
	*)
		exec "$@"
		;;
esac
