import java.io.IOException;
import java.util.HashSet;
//import java.util.Iterator;
import java.util.Set;
//import java.util.StringTokenizer;
//import org.apache.hadoop.io.IntWritable;
//import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
//import org.apache.hadoop.mapreduce.Reducer.Context;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.TextInputFormat;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.fs.Path;


public class TagsPorPalabra {
	
	
	public class WCConstants {
		public static final int sitio = 0;
		public static final int tag = 1;
		public static final int palabra = 2;
		
	}
	
	public static class Map extends Mapper<Object, Text, Text, Text>{
		
		Text palabraKey=new Text();
		Text tagValue=new Text();
		
		public void map(Object key, Text value,
				Mapper<Object, Text, Text, Text>.Context context)
				throws IOException, InterruptedException {
				
			String[] parts = value.toString().split("[|]");
			if(parts.length==3 && !(parts[2].toString().isEmpty())) {
				palabraKey.set(parts[0].toString()+' '+parts[2].toString());
				tagValue.set(parts[1].toString());
				
			
				context.write(palabraKey, tagValue);
			}
		}
	}
		
		public static class Reduce extends 
			Reducer<Text, Text, Text, Text>{
			
			public void reduce(Text palabra,
					Iterable<Text> values,
					Reducer<Text, Text, Text, Text>.Context context)
					throws IOException, InterruptedException {
				
				Set<Text> tags = new HashSet<Text>();
				
				String cadena="";
				for(Text x: values) {
					tags.add(new Text(x));
				}
				for(Text y: tags) {
					cadena=cadena+' '+y;
					
				}
				context.write(palabra, new Text(cadena));
				
				
			}
			
			
		}
			
	
			
		
	
	
	
	
	public static void main(String[] args) throws Exception{
		
		Configuration conf=new Configuration();
		
		Job job = Job.getInstance(conf, "MapReduceCrawler");
		
		job.setJarByClass(TagsPorPalabra.class);
		
		job.setMapperClass(Map.class);
		job.setReducerClass(Reduce.class);
		
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);
		
		job.setInputFormatClass(TextInputFormat.class);
		job.setOutputFormatClass(TextOutputFormat.class);
		
		
		Path outputPath = new Path(args[1]);
		
		FileInputFormat.addInputPath(job, new Path(args[0]));
		FileOutputFormat.setOutputPath(job, new Path(args[1]));
		
		outputPath.getFileSystem(conf).delete(outputPath, true);
		
		System.exit(job.waitForCompletion(true) ? 0 : 1);
		
	
	}
	
}








