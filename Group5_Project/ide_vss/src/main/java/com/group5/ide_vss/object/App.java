package com.group5.ide_vss.object;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.group5.ide_vss.data.dataServices;
import com.group5.ide_vss.utils.UtilPi;
import com.group5.ide_vss.utils.UtilDirectory;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;

public class App {

    private String fileName;
    private String appName;
    private String workingDirectory;
    private Unit[] units;
    private String originJson;

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getWorkingDirectory() {
        return workingDirectory;
    }

    public void setWorkingDirectory(String workingDirectory) {
        this.workingDirectory = workingDirectory;
    }

    public Unit[] getUnits() {
        return units;
    }

    public void setUnits(Unit[] units) {
        this.units = units;
    }

    public String getOriginJson() {
        return originJson;
    }

    public void setOriginJson(String originJson) {
        this.originJson = originJson;
    }

    @Override
    public String toString() {
        return "App{" +
                "fileName='" + fileName + '\'' +
                ", appName='" + appName + '\'' +
                ", workingDirectory='" + workingDirectory + '\'' +
                ", units=" + Arrays.toString(units) +
                ", originJson='" + originJson + '\'' +
                '}';
    }

    public App(String json) throws JsonProcessingException {
        this.workingDirectory = UtilDirectory.workingDirectory;
        this.originJson = json;
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(json);
        this.appName = node.get("appname").asText();
        this.fileName = appName + ".json";
        JsonNode unitOfNode = node.get("units");
        units = new Unit[unitOfNode.size()];
        int index = 0;
        for (JsonNode curNode : unitOfNode) {
            Executable one, two;
            String preName = curNode.get("pre").asText(), postName = curNode.get("post").asText();
            if (dataServices.services.containsKey(preName))
                one = dataServices.services.get(preName);
            else if (dataServices.relationships.containsKey(preName))
                one = dataServices.relationships.get(preName);
            else
                one = null;

            if (dataServices.services.containsKey(postName))
                two = dataServices.services.get(postName);
            else if (dataServices.relationships.containsKey(postName))
                two = dataServices.relationships.get(postName);
            else
                two = null;
            units[index++] = new Unit(one, curNode.get("prepara").asText(), curNode.get("value").asText(), two, curNode.get("postpara").asText());
        }
    }

    public String[] run() throws IOException {
        int index = 0;
        String[] res = new String[units.length];
        for (Unit unit : units) {
            System.out.println("Running unit " + index + 1);
            res[index++] = unit.run();
        }
        return res;
    }

    class Unit {
        Executable pre;
        String prePara;
        String value; // int, bool, or string?
        Executable post;
        String postPara;

        public Unit(Executable pre, String prePara, String value, Executable post, String postPara) {
            this.pre = pre;
            this.prePara = prePara;
            this.value = value;
            this.post = post;
            this.postPara = postPara;
        }

        public String run() throws IOException {
            if (pre == null) {
                String result = post.call("(" + postPara + ")");
                System.out.println("Result is: " + result);
                return result;
            }
            if (pre.call("(" + prePara + ")").equals(value)) {
                String result = post.call("(" + postPara + ")");
                System.out.println("Result is: " + result);
                return result;
            }
            return null;
        }
    }

    public void saveApp() throws IOException {
        File file = new File(this.workingDirectory + "/" + this.fileName);
        System.out.println(file.getAbsolutePath());
        FileWriter writer = new FileWriter(file);
        System.out.println(this.originJson);
        writer.write(this.originJson);
        writer.close();
    }

    public void deleteApp() {
        File myObj = new File(this.workingDirectory + "/" + this.fileName);
        if (myObj.delete()) {
            System.out.println("Deleted the file: " + myObj.getName());
        } else System.out.println("Failed to delete the file.");
    }
}

