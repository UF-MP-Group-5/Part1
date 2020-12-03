package com.group5.ide_vss.data;

import com.group5.ide_vss.object.App;
import com.group5.ide_vss.object.Relationship;
import com.group5.ide_vss.object.Service;
import com.group5.ide_vss.object.Thing;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class dataServices {
    public static Map<String, Service> services = new HashMap<>();

    public static Map<String, Thing> things = new HashMap<>();

    public static Map<String, Relationship> relationships = new HashMap<>();

    public static Map<String, App> apps = new HashMap<>();

}
