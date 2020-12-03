package com.group5.ide_vss.object;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.group5.ide_vss.data.dataServices;
import org.w3c.dom.CDATASection;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class Service implements Executable {

//    private String ip;
//
//    private int port = 6668;

    private String name;

    private String thing_id;

    private String entity_id;

    private String space_id;

    private String vendor;

    private String api;

    private String type;

    private String appcategory;

    private String description;

    private String keywords;

    public Service(String name, String thing_id, String entity_id, String space_id, String vendor, String api, String type, String appcategory, String description, String keywords) {
        this.name = name;
        this.thing_id = thing_id;
        this.entity_id = entity_id;
        this.space_id = space_id;
        this.vendor = vendor;
        this.api = api;
        this.type = type;
        this.appcategory = appcategory;
        this.description = description;
        this.keywords = keywords;
    }

    public String call(String inputs) throws IOException {
        Socket socket = new Socket(dataServices.things.get(this.thing_id).getIp(), dataServices.things.get(this.thing_id).getPort());
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode node = mapper.createObjectNode();
        node.put("Tweet Type", "Service call");
        node.put("Thing ID", this.thing_id);
        node.put("Space ID", this.space_id);
        node.put("Service Name", this.name);
        node.put("Service Inputs", inputs);
        String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(node);
        OutputStreamWriter output = new OutputStreamWriter(socket.getOutputStream(), StandardCharsets.UTF_8);
        BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream(), StandardCharsets.UTF_8));
        output.write(json);
        output.flush();
        StringBuilder builder = new StringBuilder();
        while (true) {
            String curLine = br.readLine();
            if (curLine == null)
                break;
            builder.append(curLine).append(System.lineSeparator());
        }
        br.close();
        output.close();
        socket.close();
        String tweet = builder.toString();
        JsonNode resultJson = mapper.readTree(tweet);
        String result = resultJson.get("Service Result").asText();
        return result;
    }

    @Override
    public String toString() {
        return "Service{" +
                "name='" + name + '\'' +
                ", thing_id='" + thing_id + '\'' +
                ", entity_id='" + entity_id + '\'' +
                ", space_id='" + space_id + '\'' +
                ", vendor='" + vendor + '\'' +
                ", api='" + api + '\'' +
                ", type='" + type + '\'' +
                ", appcategory='" + appcategory + '\'' +
                ", description='" + description + '\'' +
                ", keywords='" + keywords + '\'' +
                '}';
    }

    //    public String getIp() {
//        return ip;
//    }
//
//    public void setIp(String ip) {
//        this.ip = ip;
//    }
//
//    public int getPort() {
//        return port;
//    }
//
//    public void setPort(int port) {
//        this.port = port;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getThing_id() {
        return thing_id;
    }

    public void setThing_id(String thing_id) {
        this.thing_id = thing_id;
    }

    public String getEntity_id() {
        return entity_id;
    }

    public void setEntity_id(String entity_id) {
        this.entity_id = entity_id;
    }

    public String getSpace_id() {
        return space_id;
    }

    public void setSpace_id(String space_id) {
        this.space_id = space_id;
    }

    public String getVendor() {
        return vendor;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public String getApi() {
        return api;
    }

    public void setApi(String api) {
        this.api = api;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAppcategory() {
        return appcategory;
    }

    public void setAppcategory(String appcategory) {
        this.appcategory = appcategory;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }
}
