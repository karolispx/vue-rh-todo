<template lang="html">
    <section class="tasks-page">
        <div class="static-content-page">
            <v-alert v-if="alert.display" transition="scale-transition" :value="true" :type="alert.type" class="app-alert-dialog">
                <strong>{{ alert.message }}</strong>
            </v-alert>

            <v-container>
                <div class="text-center">
                    <h1>My Tasks</h1>
                </div>

                <section v-if="! loadingTasks" class="list-tasks">
                    <div class="text-center">
                        <v-btn color="white" class="success" flat @click="toggleCreateTaskDialog()">
                            <v-icon left>add</v-icon> Create New Task
                        </v-btn>

                        <br />
                        <br />
                    </div>

                    <section v-if="tasks">
                        <v-layout row>
                            <v-flex xs12>
                                <v-card v-for="task in tasks" :key="task.taskid">
                                    <div class="task-card-buttons">
                                        <v-layout row wrap>
                                            <v-flex sm6>
                                                <v-icon small>watch_later</v-icon>
                                                <span><strong> Created on:</strong> {{ task.date_created }}</span>
                                            </v-flex>

                                            <v-flex sm6 style="text-align: right;">
                                                <v-btn title="Watch Task" v-if="task.watching === 'no'" color="white" class="info" small @click="watchTask(task.taskid)">
                                                    <v-icon small>star</v-icon> Watch
                                                </v-btn>

                                                <v-btn title="Unwatch Task" v-else outline flat small color="blue" @click="unwatchTask(task.taskid)">
                                                    <v-icon small>star_border</v-icon> Unwatch
                                                </v-btn>

                                                <v-btn title="Delete Task" outline flat icon small color="red" @click="deleteTask(task.taskid)">
                                                    <v-icon small>delete_forever</v-icon>
                                                </v-btn>

                                                <v-btn title="Update Task" outline flat icon small color="orange" @click="toggleUpdateTaskDialog(task.taskid, task.task)">
                                                    <v-icon small>edit</v-icon>
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </div>

                                    <p>{{ task.task }}</p>
                                </v-card>

                                <div class="text-center">
                                    <br />
                                    <br />

                                    <v-btn v-if="moreTasksToLoad" color="white" class="info" flat @click="loadMoreTasks()">
                                        <v-icon left>cloud_download</v-icon> Load More Tasks
                                    </v-btn>

                                    <p v-else>There is no more tasks to load.</p>
                                </div>
                            </v-flex>
                        </v-layout>
                    </section>
                </section>

            </v-container>
        </div>



        <v-dialog v-model="createTaskForm.display" persistent max-width="500px">
            <v-card class="dashboard-modal-dialog elevation-12">
                <v-card-title>
                    <h1>Create New Task</h1>

                    <span class="dashboard-modal-dialog-close">
                       <v-btn @click="toggleCreateTaskDialog()" color="white" small flat icon>
                         <v-icon>close</v-icon>
                       </v-btn>
                    </span>
                </v-card-title>

                <v-form class="dashboard-modal-dialog-form" @submit.prevent="submitCreateTaskForm" id="create-task-form" v-model="createTaskForm.valid" ref="createTaskForm">

                    <v-card-text>
                        <section v-if="createTaskForm.message">
                            <v-alert :value="true" type="warning" class="text-center">
                                <strong>{{ createTaskForm.message }}</strong>
                            </v-alert>
                        </section>


                        <br />

                        <v-textarea solo label="Task Details" :disabled="createTaskForm.formLoading" :rules="createTaskForm.defaultRules" v-model="createTaskForm.task" name="task" required></v-textarea>
                    </v-card-text>

                    <v-card-actions class="justify-center">
                        <v-btn :loading="createTaskForm.formLoading" rounded color="primary" class="dashboard-modal-dialog-submit-area" type="submit" form="create-task-form" :disabled="! createTaskForm.valid || createTaskForm.formLoading">
                            <v-icon>check</v-icon> Save
                        </v-btn>

                        <span class="form-spacer"></span>

                        <v-btn rounded class="dashboard-modal-dialog-submit-area" @click="toggleCreateTaskDialog()">
                            <v-icon>close</v-icon> Cancel
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>

        <v-dialog v-model="updateTaskForm.display" persistent max-width="500px">
            <v-card class="dashboard-modal-dialog elevation-12">
                <v-card-title>
                    <h1>Update Task</h1>

                    <span class="dashboard-modal-dialog-close">
                       <v-btn @click="toggleUpdateTaskDialog()" color="white" small flat icon>
                         <v-icon>close</v-icon>
                       </v-btn>
                    </span>
                </v-card-title>

                <v-form class="dashboard-modal-dialog-form" @submit.prevent="submitUpdateTaskForm" id="update-task-form" v-model="updateTaskForm.valid" ref="updateTaskForm">

                    <v-card-text>
                        <section v-if="updateTaskForm.message">
                            <v-alert :value="true" type="warning" class="text-center">
                                <strong>{{ updateTaskForm.message }}</strong>
                            </v-alert>
                        </section>

                        <br />

                        <v-textarea :value="updateTaskForm.task" solo label="Task Details" :disabled="updateTaskForm.formLoading" :rules="updateTaskForm.defaultRules" v-model="updateTaskForm.task" name="task" required></v-textarea>
                    </v-card-text>

                    <v-card-actions class="justify-center">
                        <v-btn :loading="updateTaskForm.formLoading" rounded color="primary" class="dashboard-modal-dialog-submit-area" type="submit" form="update-task-form" :disabled="! updateTaskForm.valid || updateTaskForm.formLoading">
                            <v-icon>check</v-icon> Save
                        </v-btn>

                        <span class="form-spacer"></span>

                        <v-btn rounded class="dashboard-modal-dialog-submit-area" @click="toggleUpdateTaskDialog()">
                            <v-icon>close</v-icon> Cancel
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>

    </section>
</template>


<script lang="js">
    export default {
        data(){
            return {
                alert: {
                    display: false,
                    message: null,
                    type: null
                },
                loadingTasks: false,
                createTaskForm: {
                    formLoading: false,
                    display: false,
                    message: false,
                    task: '',
                    valid: false,
                    defaultRules: [
                        v => !!v || 'This field is required.'
                    ]
                },
                updateTaskForm: {
                    formLoading: false,
                    display: false,
                    message: false,
                    task: '',
                    taskid: '',
                    valid: false,
                    defaultRules: [
                        v => !!v || 'This field is required.'
                    ]
                },
                loadingTasksPage: 1
            }
        },
        computed: {
            tasks () {
                return this.$store.state.tasks.tasks
            },
            moreTasksToLoad () {
                return this.$store.state.tasks.moreTasksToLoad
            }
        },
        created () {
            this.getTasks(1)
        },
        methods: {
            unwatchTask (taskID) {
                if ( taskID ) {
                    if ( confirm("Are you sure you want to unwatch this task?") ) {
                        this.$store.dispatch('loader/page', 'on');

                        this.$store.dispatch( 'tasks/unwatchTask', taskID ).then( response => {
                            this.$store.dispatch('loader/page', 'off');
                            window.scrollTo(0, 0);

                            this.alert.message = response;
                            this.alert.type = "success";
                            this.alert.display = true;

                            setTimeout( () => {
                                this.getTasks(1);

                                this.alert.display = false;
                            }, 5000 );
                        }, error => {
                            this.$store.dispatch('loader/page', 'off');
                            window.scrollTo(0, 0);

                            this.alert.message = error;
                            this.alert.type = "error";
                            this.alert.display = true;
                        });
                    }
                } else {
                    this.alert.message = 'Please provide all information.';
                    this.alert.type = "error";
                    this.alert.display = true;
                }
            },
            watchTask (taskID) {
                if ( taskID ) {
                    if ( confirm("Are you sure you want to watch this task?") ) {
                        this.$store.dispatch('loader/page', 'on');

                        this.$store.dispatch( 'tasks/watchTask', taskID ).then( response => {
                            this.$store.dispatch('loader/page', 'off');
                            window.scrollTo(0, 0);

                            this.alert.message = response;
                            this.alert.type = "success";
                            this.alert.display = true;

                            setTimeout( () => {
                                this.getTasks(1);

                                this.alert.display = false;
                            }, 5000 );
                        }, error => {
                            this.$store.dispatch('loader/page', 'off');
                            window.scrollTo(0, 0);

                            this.alert.message = error;
                            this.alert.type = "error";
                            this.alert.display = true;
                        });
                    }
                } else {
                    this.alert.message = 'Please provide all information.';
                    this.alert.type = "error";
                    this.alert.display = true;
                }
            },
            deleteTask (taskID) {
                if ( taskID ) {
                    if ( confirm("Are you sure you want to delete this task?") ) {
                        this.$store.dispatch('loader/page', 'on');

                        this.$store.dispatch( 'tasks/deleteTask', taskID ).then( response => {
                            this.$store.dispatch('loader/page', 'off');
                            window.scrollTo(0, 0);

                            this.alert.message = response;
                            this.alert.type = "success";
                            this.alert.display = true;

                            setTimeout( () => {
                                this.getTasks(1);

                                this.alert.display = false;
                            }, 5000 );
                        }, error => {
                            this.$store.dispatch('loader/page', 'off');
                            window.scrollTo(0, 0);

                            this.alert.message = error;
                            this.alert.type = "error";
                            this.alert.display = true;
                        });
                    }
                } else {
                    this.alert.message = 'Please provide all information.';
                    this.alert.type = "error";
                    this.alert.display = true;
                }
            },
            submitUpdateTaskForm () {
                const taskid = this.updateTaskForm.taskid;
                const task = this.updateTaskForm.task;

                if ( taskid && task && ! this.updateTaskForm.formLoading ) {
                    this.$store.dispatch('loader/page', 'on');

                    this.updateTaskForm.message = false;
                    this.updateTaskForm.formLoading = true;

                    this.$store.dispatch( 'tasks/updateTask', { taskid, task } ).then( response => {
                        this.$store.dispatch('loader/page', 'off');
                        this.updateTaskForm.formLoading = false;

                        this.toggleUpdateTaskDialog();

                        this.alert.message = response;
                        this.alert.type = "success";
                        this.alert.display = true;

                        setTimeout( () => {
                            this.getTasks(1);

                            this.alert.display = false;
                        }, 5000 );
                    }, error => {
                        this.updateTaskForm.formLoading = false;
                        this.$store.dispatch('loader/page', 'off');
                        this.updateTaskForm.message = error;
                    });
                } else {
                    this.updateTaskForm.formLoading = false;
                    this.updateTaskForm.message = 'Please provide all information.';
                }

            },
            toggleUpdateTaskDialog ( taskid = '', task = '' ) {
                const formActive = this.updateTaskForm.display;

                if ( formActive === true ) {
                    this.updateTaskForm.display = false;
                }

                setTimeout(() => {
                    this.$refs.updateTaskForm.resetValidation();
                    this.updateTaskForm.task = '';
                    this.updateTaskForm.taskid = '';

                    this.updateTaskForm.message = false;
                    this.updateTaskForm.valid = false;

                    if ( formActive === false ) {
                        this.updateTaskForm.display = true;

                        if ( taskid != '' && task != '' ) {
                            this.updateTaskForm.task = task;
                            this.updateTaskForm.taskid = taskid;
                        }
                    }
                }, 100);
            },
            submitCreateTaskForm () {
                const task = this.createTaskForm.task;

                if ( task && ! this.createTaskForm.formLoading ) {
                    this.$store.dispatch('loader/page', 'on');

                    this.createTaskForm.message = false;
                    this.createTaskForm.formLoading = true;

                    this.$store.dispatch( 'tasks/createTask', task ).then( response => {
                        this.$store.dispatch('loader/page', 'off');
                        window.scrollTo(0, 0);

                        this.createTaskForm.formLoading = false;

                        this.toggleCreateTaskDialog();

                        this.alert.message = response;
                        this.alert.type = "success";
                        this.alert.display = true;

                        setTimeout( () => {
                            this.getTasks(1);

                            this.alert.display = false;
                        }, 5000 );
                    }, error => {
                        this.$store.dispatch('loader/page', 'off');
                        window.scrollTo(0, 0);

                        this.createTaskForm.formLoading = false;
                        this.createTaskForm.message = error;
                    });
                } else {
                    this.createTaskForm.formLoading = false;
                    this.createTaskForm.message = 'Please provide all information.';
                }
            },
            toggleCreateTaskDialog () {
                const formActive = this.createTaskForm.display;

                if ( formActive === true ) {
                    this.createTaskForm.display = false;
                }

                setTimeout(() => {
                    this.$refs.createTaskForm.resetValidation();
                    this.createTaskForm.task = '';

                    this.createTaskForm.message = false;
                    this.createTaskForm.valid = false;

                    if ( formActive === false ) {
                        this.createTaskForm.display = true;
                    }
                }, 100);
            },
            getTasks(page) {
                let pageToLoad = this.loadingTasksPage;

                if ( page && page > 1 ) {
                    pageToLoad = page;
                } else {
                    this.loadingTasksPage = 1;
                    this.loadingTasks = true;
                }

                this.$store.dispatch('loader/page', 'on');

                this.$store.dispatch('tasks/getTasks', pageToLoad).then( response => {
                    if ( pageToLoad < 2 ) {
                        this.loadingTasks = false;

                        window.scrollTo(0, 0);
                    }

                    this.$store.dispatch('loader/page', 'off');
                }, error => {
                    this.loadingTasks = false;
                    this.$store.dispatch('loader/page', 'off');

                    if ( error != 'nomore' ) {
                        window.scrollTo(0, 0);

                        this.alert.message = error;
                        this.alert.type = "error";
                        this.alert.display = true;
                    }
                });
            },
            loadMoreTasks() {
                this.loadingTasksPage++;

                this.getTasks(this.loadingTasksPage)
            }
        }
    }
</script>