// Authors:
// * Baptiste Saleil http://bsaleil.org/
// * Community: https://github.com/bsaleil/todolist-gnome-shell-extension/network
// With code from: https://github.com/vibou/vibou.gTile
//
// Licence: GPLv2+

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const GTGIface = '<node>				\
<interface name="org.gnome.GTG">			\
							\
<method name="ModifyTask">				\
   <arg direction="in"  type="v" name="tid" />		\
   <arg direction="in"  type="v" name="task_data" />	\
   <arg direction="out" type="a{sv}" name="taskdata" />	\
</method>						\
							\
<method name="NewTask">					\
   <arg direction="in"  type="s" name="status" />	\
   <arg direction="in"  type="s" name="title" />	\
   <arg direction="in"  type="s" name="duedate" />	\
   <arg direction="in"  type="s" name="startdate" />	\
   <arg direction="in"  type="s" name="donedate" />	\
   <arg direction="in"  type="as" name="tags" />	\
   <arg direction="in"  type="s" name="text" />		\
   <arg direction="in"  type="as" name="subtasks" />	\
   <arg direction="out" type="a{sv}" name="newtask" />	\
</method>						\
							\
<method name="GetTask">					\
   <arg direction="in"  type="v" name="tid" />		\
</method>						\
							\
<method name="SearchTasks">				\
   <arg direction="in"   type="s" name="query" />	\
   <arg direction="out"  type="aa{sv}" name="tasks" />	\
</method>						\
							\
</interface>						\
</node>';

const GTGProxy = Gio.DBusProxy.makeProxyWrapper(GTGIface);
const gtgInstance = new GTGProxy(Gio.DBus.session, 'org.gnome.GTG', '/org/gnome/GTG');

const text = "Dogovoriti dolazak vodinstalatera zbog radijatora u kupaoni";

// let tasks = gtgInstance.SearchTasksSync('"' + text + '" ' + "@gnometodo");
let tasks = gtgInstance.SearchTasksSync('"' + text + '" ');

log("Returned results: " + tasks[0].length);
log("Keys: " + Object.keys(tasks).length);
log("Typeof tasks: " + typeof tasks);
log("Typeof tasks[0]: " + typeof tasks[0]);

// for (let task in tasks[0]) {
// 	log(tasks[0][task]);
// 	for (let property in tasks[0][task]) {
// 		log("   " + tasks[0][task][property]);
// 		log("   " + tasks[0][task][property].unpack());
// 	}
// }

for (let task in tasks[0]) {
	log("Task ID: " + tasks[0][task]["id"].unpack());
	log("Task status: " + tasks[0][task]["status"].unpack());
	log("Task tags 1: " + tasks[0][task]["tags"]);
	log("Task tags 2: " + tasks[0][task]["tags"].unpack());

	let text = tasks[0][task]["text"].unpack();
	text = text.replace("<content>", "").replace("</content>", "");
	log("Text: " + text);

//	let modified_task_data = GLib.Variant.new_array(null, [
//		GLib.Variant.new_dict_entry(
//			GLib.Variant.new_string("status"),
//			GLib.Variant.new_string("Done")
//		),
//		GLib.Variant.new_dict_entry(GLib.Variant.new_string("donedate"), GLib.Variant.new_string("2016-06-11")),
//		GLib.Variant.new_dict_entry(GLib.Variant.new_string("title"), tasks[0][task]["title"]),
//		GLib.Variant.new_dict_entry(GLib.Variant.new_string("duedate"), tasks[0][task]["duedate"]),
//		GLib.Variant.new_dict_entry(GLib.Variant.new_string("startdate"), tasks[0][task]["startdate"]),
//		GLib.Variant.new_dict_entry(GLib.Variant.new_string("text"), GLib.Variant.new_string(tasks[0][task]["text"].unpack() + "\n\nClosed on")),
//		GLib.Variant.new_dict_entry(GLib.Variant.new_string("tags"), GLib.Variant.new_string("")),
//		GLib.Variant.new_dict_entry(GLib.Variant.new_string("subtask"), GLib.Variant.new_string("")),
//	]);
//
//	gtgInstance.ModifyTaskSync(tasks[0][task]["id"], modified_task_data);
}

