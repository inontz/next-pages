export type Town = {
	id: string;
	name: string;
	status: "online" | "offline" | "degraded";
};

export type Rig = {
	id: string;
	name: string;
	repo: string;
	status: "active" | "idle" | "error";
};

export type Agent = {
	id: string;
	type: "mayor" | "polecat" | "refinery" | "triage";
	name: string;
	status: string;
	progress?: number;
};

export type Bead = {
	id: string;
	title: string;
	status: "pending" | "active" | "dispatched" | "committed";
	convoys: string[];
};

export type Convoy = {
	id: string;
	beadIds: string[];
	status: "moving" | "stalled" | "complete";
};
