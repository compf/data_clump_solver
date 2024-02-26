cd dist/eclipse.jdt.ls/org.eclipse.jdt.ls.product/target/repository
rm -r temp
java \
    -Declipse.application=org.eclipse.jdt.ls.core.id1 \
    -Dosgi.bundles.defaultStartLevel=4 \
    -Declipse.product=org.eclipse.jdt.ls.core.product \
    -Dlog.level=ALL \
    -Xmx1G \
    --add-modules=ALL-SYSTEM \
    --add-opens java.base/java.util=ALL-UNNAMED \
    --add-opens java.base/java.lang=ALL-UNNAMED \
    -jar ./plugins/org.eclipse.equinox.launcher_1.6.600.v20231012-1237.jar \
    -configuration ./config_linux \
    -data ./temp