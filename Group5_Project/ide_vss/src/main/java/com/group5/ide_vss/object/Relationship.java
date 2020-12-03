package com.group5.ide_vss.object;

import com.group5.ide_vss.data.dataServices;

import java.io.IOException;

public class Relationship implements Executable{

    private String name;

    private String establisher;

    private String description;

    private String service1;

    private String service2;

    private String type;

    public Relationship(String name, String establisher, String description, String service1, String service2, String type) {
        this.name = name;
        this.establisher = establisher;
        this.description = description;
        this.service1 = service1;
        this.service2 = service2;
        this.type = type;
    }

    @Override
    public String call(String inputs) throws IOException {
        if (this.type.equals("drive")) {
            String output1 = dataServices.services.get(this.service1).call(inputs);
            return dataServices.services.get(this.service2).call(output1);
        }
        return null;
    }

    @Override
    public String toString() {
        return "Relationship{" +
                "name='" + name + '\'' +
                ", establisher='" + establisher + '\'' +
                ", description='" + description + '\'' +
                ", service1=" + service1 +
                ", service2=" + service2 +
                ", type='" + type + '\'' +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEstablisher() {
        return establisher;
    }

    public void setEstablisher(String establisher) {
        this.establisher = establisher;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getService1() {
        return service1;
    }

    public void setService1(String service1) {
        this.service1 = service1;
    }

    public String getService2() {
        return service2;
    }

    public void setService2(String service2) {
        this.service2 = service2;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
