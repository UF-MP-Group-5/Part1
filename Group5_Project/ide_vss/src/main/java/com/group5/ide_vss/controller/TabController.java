package com.group5.ide_vss.controller;

import com.group5.ide_vss.data.dataServices;
import com.group5.ide_vss.object.*;
import com.group5.ide_vss.utils.UtilDirectory;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
public class TabController {

    @RequestMapping("/getThing")
    public Thing[] initiationOfThings() throws IOException {
        Thing[] res = new Thing[dataServices.things.size()];
        int index = 0;
        for (String key : dataServices.things.keySet()) {
            Thing cur = dataServices.things.get(key);
            res[index++] = cur;
        }
        return res;
    }

    @RequestMapping("/getService")
    public Service[] initiationOfServices() throws IOException {
        Service[] res = new Service[dataServices.services.size()];
        int index = 0;
        for (String key : dataServices.services.keySet()) {
            Service cur = dataServices.services.get(key);
            res[index++] = cur;
        }
        return res;
    }

    @RequestMapping("/getRelationship")
    public Relationship[] initiationOfRelationships() throws IOException {
        Relationship[] res = new Relationship[dataServices.relationships.size()];
        int index = 0;
        for (String key : dataServices.relationships.keySet()) {
            Relationship relationship = dataServices.relationships.get(key);
            res[index++] = relationship;
        }
        return res;
    }

    @RequestMapping("/getApps")
    public AppForWeb[] initiationOfApps() throws IOException {
        AppForWeb[] res = new AppForWeb[dataServices.apps.size()];
        int index = 0;
        for (String key : dataServices.apps.keySet()) {
            App cur = dataServices.apps.get(key);
            res[index++] = new AppForWeb(cur.getAppName(), cur.getOriginJson());
        }
        return res;
    }

    @RequestMapping(value = "/getRecipe", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public void getRecipe(@RequestBody String request) throws IOException {
        App app = new App(request);
        dataServices.apps.put(app.getAppName(), app);
    }

    @RequestMapping(value = "/activateApp", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public String[] activateApp(@RequestBody String request) throws IOException {
        App app = new App(request);
        dataServices.apps.put(app.getAppName(), app);
        String[] res = app.run();
        return res;
    }

    @RequestMapping(value = "/saveApp", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public void saveApp(@RequestBody String request) throws IOException {
        App app = new App(request);
        dataServices.apps.put(app.getAppName(), app);
        app.saveApp();
    }
//
    @RequestMapping(value = "/deleteApp", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public void deleteApp(@RequestBody String request) throws IOException {
        dataServices.apps.get(request).deleteApp();
    }

    @RequestMapping(value = "/changeDirectory", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public void changeDirectory(@RequestBody String request) throws IOException {
        UtilDirectory.setWorkingDirectory(request);
    }

}
