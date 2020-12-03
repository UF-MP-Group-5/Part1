package com.group5.ide_vss.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.group5.ide_vss.data.dataServices;
import com.group5.ide_vss.object.Relationship;
import com.group5.ide_vss.object.Service;
import com.group5.ide_vss.object.Thing;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.InetAddress;
import java.net.MulticastSocket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UtilPi {

    public static void getTweetsFromPi() {
        Map<String, String> ips = new HashMap<>();
        Map<String, Integer> ports = new HashMap<>();
        try{
            System.out.println("haha");
            MulticastSocket ms = new MulticastSocket(1235);
            InetAddress ia = InetAddress.getByName("232.1.1.1");
            ms.joinGroup(ia);
            byte[] buffer = new byte[4096];
            List<String> thinglist = new ArrayList<String>();
            List<String> tStatus = new ArrayList<String>();
            int thingcount = 0;
            tStatus.add("stop");
            tStatus.add("stop");
            tStatus.add("stop");
            tStatus.add("stop");
            tStatus.add("stop");
            while (true) {
                DatagramPacket dp = new DatagramPacket(buffer, buffer.length);
                ms.receive(dp);
                String s = new String(dp.getData());
                //SmartSpace@Group5 Group3SmartSpace
                if(s.contains("SmartSpaceGroup5")) {
                    System.out.println(s);
                    ObjectMapper mapper = new ObjectMapper();
                    JsonNode rtweets = mapper.readTree(s);
                    String tid = rtweets.get("Thing ID").asText();
                    String strs[] = tid.split("0");
                    int i = Integer.parseInt(strs[1]);
                    if(rtweets.get("Tweet Type").asText().equals("Identity_Thing")) { //first tweet of each loop
                        if (!thinglist.contains(tid)) {
                            thinglist.add(tid);
                            tStatus.set(i, "activate");
                            System.out.println(tid + s);
                            Thing thi0 = new Thing(rtweets.get("Thing ID").asText(), rtweets.get("Space ID").asText(), rtweets.get("Name").asText(), rtweets.get("Model").asText(), rtweets.get("Vendor").asText(), rtweets.get("Owner").asText(), rtweets.get("Description").asText(), rtweets.get("OS").asText());
                            dataServices.things.put(thi0.getThing_id(), thi0);
                        }else {
                            System.out.println("again"+ tid + s);
                            tStatus.set(i, "stop");
                            thingcount++;
                            System.out.println("finished listening to" + tid);
                        }
                    }
                    else if (rtweets.get("Tweet Type").asText().equals("Identity_Language")) {
                        String id = rtweets.get("Thing ID").asText();
                        ips.put(id, rtweets.get("IP").asText());
                        ports.put(id, Integer.valueOf(rtweets.get("Port").asText()));
                    }
                    else {//other tweets
                        if(thinglist.contains(tid) && tStatus.get(i).equals("activate")) {
                            System.out.println("***"+ tid + s);
                            if(rtweets.get("Tweet Type").asText().equals("Service")) {
//                                String ip0 = dp.getAddress().getHostAddress();
                                Service serv0 = new Service(rtweets.get("Name").asText(), rtweets.get("Thing ID").asText(), rtweets.get("Entity ID").asText(), rtweets.get("Space ID").asText(), rtweets.get("Vendor").asText(), rtweets.get("API").asText(), rtweets.get("Type").asText(), rtweets.get("AppCategory").asText(), rtweets.get("Description").asText(), rtweets.get("Keywords").asText() );
                                dataServices.services.put(serv0.getName(), serv0);
                            }else if(rtweets.get("Tweet Type").asText().equals("Relationship")){
                                Relationship rela0 = new Relationship(rtweets.get("Name").asText(), rtweets.get("Thing ID").asText(), rtweets.get("Description").asText(), rtweets.get("FS name").asText(), rtweets.get("SS name").asText(), rtweets.get("Type").asText());
                                dataServices.relationships.put(rela0.getName(), rela0);
                            }

                        }
                    }
                }
                if (thingcount >= 2) {
                    System.out.println("all tweets are received");
                    break;
                }

            }
        }
        catch (IOException ex){
            System.err.println(ex);
        }
        for (String id : ips.keySet()) {
            dataServices.things.get(id).setIp(ips.get(id));
            dataServices.things.get(id).setPort(ports.get(id));
        }
    }
}
