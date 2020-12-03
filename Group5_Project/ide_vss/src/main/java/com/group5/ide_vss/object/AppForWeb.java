package com.group5.ide_vss.object;

public class AppForWeb {

    private String appName;

    private String originJson;

    public AppForWeb(String appName, String originJson) {
        this.appName = appName;
        this.originJson = originJson;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getOriginJson() {
        return originJson;
    }

    public void setOriginJson(String originJson) {
        this.originJson = originJson;
    }

}
