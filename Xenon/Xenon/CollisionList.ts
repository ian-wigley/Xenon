import gsCRectangle = require("Rectangle");

class gsCCollider {
    public blobject: Array<Object> = new Array<Object>(10);//[];
    public m_object: Object;		// object pointer
    public m_rect: gsCRectangle;	// screen rectangle
    public m_uid: number;			// unique id number
    public m_object_mask: number;	// bitmask of object type
    public m_target_mask: number;	// bitmask of type of objects it can hit
    private count = 0;

    constructor(object?, rect?, object_mask?, target_mask?, uid?) {
        this.m_object = object;
        this.m_rect = rect;
        this.m_object_mask = object_mask;
        this.m_target_mask = target_mask;
        this.m_uid = uid;
    }

    public addItem(object): void {
        this.blobject[this.count++] = object;
    }

    public get Counter(): number {
        return this.count;
    }

}

import gsCPoint = require("Point");

class gsCCollisionList {

    private m_pixel_size: gsCPoint;
    private m_zones: gsCPoint;
    private m_zone_size: gsCPoint;

    m_collider_list: Array<gsCCollider> = new Array<gsCCollider>(); //gsCList<gsCCollider *> 

    gsColliderList: gsCCollider;

    //typedef gsCList<gsCCollider *> gsColliderList;
    //m_zone: Array<gsCCollider>;//(gsCCollider);//: gsColliderList;
    m_zone = [];//: Array<this.m_collider_list>;//(gsCCollider);//: gsColliderList;

    constructor() {
        this.m_pixel_size = new gsCPoint(0, 0);
        this.m_zone_size = new gsCPoint(0, 0);
        this.m_zones = new gsCPoint(0, 0);
        this.m_zone = null;//0
    }

    //-------------------------------------------------------------

    //void gsCCollisionList::destroy()
    //{
    //    clear();

    //    if (m_zone) {
    //        delete [] m_zone;
    //        m_zone = 0;
    //        }
    //}

    //-------------------------------------------------------------

    public setSize(pixel_size: gsCPoint, zones: gsCPoint): void {
        //destroy();
        this.clear();

        this.m_pixel_size = pixel_size;
        this.m_zones = zones;
        this.m_zone_size = this.m_pixel_size.divide(zones);

        // create a collider list for each zone
        this.m_zone = new Array<gsCCollider>();//this.m_zones.X * this.m_zones.Y);
        for (var i = 0; i < this.m_zones.X * this.m_zones.Y; i++) {
            this.m_zone.push(new gsCCollider());

        }
    }

    //-------------------------------------------------------------

    public clear(): void {
        // clear out the zone lists
        if (this.m_zone) {
            for (var i = 0; i < this.m_zones.X * this.m_zones.Y; i++) {
                //this.m_zone[i].clear();
                this.m_zone[i].blobject = [];
            }
            //this.m_zone = [];
        }

        // clear out the object list
        //for (var i = 0; i < m_collider_list.getSize(); i++)
        //    delete m_collider_list[i];
        this.m_collider_list = [];

        //this.m_collider_list.clear();
    }

    //-------------------------------------------------------------

    public addObject(object: Object, rect: gsCRectangle, object_mask, target_mask)//void *object,const gsCRect& rect, gsUDWORD object_mask, gsUDWORD target_mask):void
    {
        // get range of zones which object overlaps

        var left_zone: number = Math.floor(rect.Left / this.m_zone_size.X);
        var right_zone: number = Math.floor((rect.Right - 1) / this.m_zone_size.X);
        var top_zone: number = Math.floor(rect.Top / this.m_zone_size.Y);
        var bottom_zone: number = Math.floor((rect.Bottom - 1) / this.m_zone_size.Y);

        // skip if outside collision map
        if (left_zone >= this.m_zones.X ||
            right_zone < 0 ||
            top_zone >= this.m_zones.Y ||
            bottom_zone < 0)
            return;

        // clip against collision map
        if (left_zone < 0)
            left_zone = 0;
        if (right_zone >= this.m_zones.X)
            right_zone = this.m_zones.X - 1;
        if (top_zone < 0)
            top_zone = 0;
        if (bottom_zone >= this.m_zones.Y)
            bottom_zone = this.m_zones.Y - 1;

        // make a record of the collider
        var uid = this.m_collider_list.length;

        var collider: gsCCollider = new gsCCollider(object, rect, object_mask, target_mask, uid);

        this.m_collider_list.push(collider);

        //console.log("Collider List size : " + this.m_collider_list.length);
        //console.log("Zone List size : " + this.m_zone.length);

        // add to EACH zone which it overlaps
        for (var y = top_zone; y <= bottom_zone; y++) {
            for (var x = left_zone; x <= right_zone; x++) {
                // this.m_zone[y * this.m_zones.X + x] = collider;//.addItem(collider);
                var hmmm = y * this.m_zones.X + x;
                // this.m_zone[y * this.m_zones.X + x].blobject.push(collider);
                //addItem
                this.m_zone[y * this.m_zones.X + x].addItem(collider);//
            }
        }
    }

    ////-------------------------------------------------------------


    public scan( /*gsCollisionCallback * */callback): void {
        //if (!callback)
        //    return;

        var num_objects: number = this.m_collider_list.length;


        // scan the zones
        //for (var i = 0; i < this.m_zones.X * this.m_zones.Y; i++) {

        // skip if empty or only one collider
        if (this.m_collider_list.length > 1) {
            //    // we've found a zone with at least 2 objects in it
            //    // test all combinations of pairs of objects
            for (var a = 0; a < this.m_collider_list.length; a++) {

                // Ship !
                var obj_a: gsCCollider = this.m_collider_list[a];


                for (var b = a + 1; b < this.m_collider_list.length; b++) { //length; b++) {

                    var obj_b: gsCCollider = this.m_collider_list[b];

                    // skip pairs we've already tested
                    //if (tp[obj_b.m_uid] == 0) {


                    // check if rectangles overlap
                    if (obj_a.m_rect.overlaps(obj_b.m_rect)) {

                        // if object a can hit object b test collision
                        if ((obj_a.m_target_mask & obj_b.m_object_mask) != 0)
                            callback(obj_a.m_object, obj_b.m_object);

                        if ((obj_b.m_target_mask & obj_a.m_object_mask) != 0)
                            callback(obj_b.m_object, obj_a.m_object);
                    }

                    // mark pair as having been tested
                    //tp[obj_b.m_uid] = 1;
                }
            }
        }
        //}
        //}

        // delete the flags
        //tested = [];
    }





    //public scan( /*gsCollisionCallback * */callback): void {
    //    //if (!callback)
    //    //    return;

    //    var num_objects: number = this.m_collider_list.length;


    //    // scan the zones
    //    //for (var i = 0; i < this.m_zones.X * this.m_zones.Y; i++) {

    //        // skip if empty or only one collider
    //        if (this.m_collider_list.length > 1) {
    //            //    // we've found a zone with at least 2 objects in it
    //            //    // test all combinations of pairs of objects
    //            for (var a = 0; a < this.m_collider_list.length - 1; a++) {

    //                // Ship !
    //                var obj_a: gsCCollider = this.m_collider_list[num_objects - 1];

    //                var obj_b: gsCCollider = this.m_collider_list[a];

    //                // skip pairs we've already tested
    //                //if (tp[obj_b.m_uid] == 0) {


    //                // check if rectangles overlap
    //                if (obj_a.m_rect.overlaps(obj_b.m_rect)) {

    //                    // if object a can hit object b test collision
    //                    if ((obj_a.m_target_mask & obj_b.m_object_mask) != 0)
    //                        callback(obj_a.m_object, obj_b.m_object);

    //                    if ((obj_b.m_target_mask & obj_a.m_object_mask) != 0)
    //                        callback(obj_b.m_object, obj_a.m_object);
    //                }

    //                // mark pair as having been tested
    //                //tp[obj_b.m_uid] = 1;
    //            }
    //        }
    //    //}
    //    //}
    //    //}

    //    // delete the flags
    //    //tested = [];
    //}













    //public scan( /*gsCollisionCallback * */callback): void {
    //    //if (!callback)
    //    //    return;

    //    var num_objects: number = this.m_collider_list.length;

    //    // create an array of flags to mark whether we've tested
    //    // a particular combination of objects
    //    var tested: number = 0; // Array<number> = new Array<number>(num_objects * num_objects);
    //    ////if (num_objects == 0){
    //    //    tested.push(num_objects);
    //    //    //tested[0] = 0;
    //    ////}
    //    ////memset(tested,0,num_objects * num_objects);

    //    // scan the zones
    //    for (var i = 0; i < this.m_zones.X * this.m_zones.Y; i++) {

    //        // get list of the colliders in the zone
    //        //var collider_list: Array<gsCCollider> = this.m_zone[i];
    //        var collider_list = this.m_zone[i];

    //        //var rar = this.m_zone[i];
    //        //if (rar.blobject.length > 1) {
    //        //    var stopHere = true;
    //        //}

    //        // skip if empty or only one collider
    //        //if (collider_list...length > 1) {
    //        if (collider_list.count > 1) {
    //            //    // we've found a zone with at least 2 objects in it
    //            //    // test all combinations of pairs of objects
    //            for (var a = 0; a < collider_list.count; a++) {//   length; a++) {

    //                var obj_a: gsCCollider = collider_list.blobject[a + 1]; //length

    //                        // get pointer to row of flags for object a
    //                //var tp /*: number*/ = tested[a] + obj_a.m_uid * num_objects;
    //                var tp /*: number*/ = obj_a.m_uid * num_objects;

    //                        for (var b = a + 1; b < collider_list.count;b++){ //length; b++) {

    //                            var obj_b: gsCCollider = collider_list.blobject[b];

    //                            // skip pairs we've already tested
    //                            if (tp[obj_b.m_uid] == 0) {

    //                                //gsASSERT(obj_a->m_object);
    //                                //gsASSERT(obj_b->m_object);

    //                                // check if rectangles overlap
    //                                if (obj_a.m_rect.overlaps(obj_b.m_rect)) {

    //                                    // if object a can hit object b test collision
    //                                    if ((obj_a.m_target_mask & obj_b.m_object_mask) != 0)
    //                                        callback(obj_a.m_object, obj_b.m_object);

    //                                    if ((obj_b.m_target_mask & obj_a.m_object_mask) != 0)
    //                                        callback(obj_b.m_object, obj_a.m_object);
    //                                }

    //                                // mark pair as having been tested
    //                                tp[obj_b.m_uid] = 1;
    //                            }
    //                        }
    //            }
    //        }
    //    }

    //    // delete the flags
    //    //tested = [];
    //}

    //-------------------------------------------------------------
}
export = gsCCollisionList;